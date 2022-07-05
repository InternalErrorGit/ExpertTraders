"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertTrader = void 0;
const ConfigTypes_1 = require("../../../../Aki_data/Server/lib/models/enums/ConfigTypes");
const constants_1 = require("./constants");
class ExpertTrader {
    constructor() {
        this.ROUBLE = "5449016a4bdc2d6f028b456f";
    }
    setDatabaseServer(databaseServer) {
        this.databaseServer = databaseServer;
    }
    createTraderLocale() {
        this.traderLocale = {
            FullName: this.getTraderBase().nickname,
            FirstName: this.getTraderBase().name,
            Nickname: this.getTraderBase().nickname,
            Location: this.getTraderBase().location,
            Description: this.getTraderBase().location
        };
    }
    getTraderLocale() {
        return this.traderLocale;
    }
    createTraderAssort() {
        this.traderAssort = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        };
    }
    getTraderBase() {
        return this.traderBase;
    }
    registerProfileImage(container) {
        const initialModLoader = container.resolve("InitialModLoader");
        const imageFilepath = `./${initialModLoader.getModPath("ExpertTraders")}res`;
        const imageRouter = container.resolve("ImageRouter");
        imageRouter.addRoute(this.traderBase.avatar.replace(".png", ""), `${imageFilepath}/${this.traderBase._id}.png`);
    }
    setupTraderUpdateTime(container) {
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const traderRefreshConfig = { traderId: this.traderBase._id, seconds: 3600 };
        traderConfig.updateTime.push(traderRefreshConfig);
    }
    isTraderItemValid(item) {
        for (const key in constants_1.Constants.itemBlacklist) {
            const value = constants_1.Constants.itemBlacklist[key];
            if (value == item._id) {
                return false;
            }
        }
        for (const key in this.getTraderSellCategories()) {
            const value = this.getTraderSellCategories()[key];
            if (value == item._parent) {
                return true;
            }
        }
        return false;
    }
    injectItemUnlockQuest(quest) {
        if (!globalThis.CustomQuestsAPI) {
            return;
        }
        globalThis.CustomQuestsAPI.load([quest]);
    }
    getTraderAssort() {
        this.createTraderAssort();
        const assortTable = this.traderAssort;
        const tables = this.databaseServer.getTables();
        for (const key in tables.templates.items) {
            const item = tables.templates.items[key];
            if (!this.isTraderItemValid(item))
                continue;
            assortTable.items.push(this.createTraderItem(item));
            const itemPrice = tables.templates.prices[item._id];
            assortTable.barter_scheme[item._id] = [
                [
                    {
                        count: itemPrice,
                        _tpl: this.ROUBLE
                    }
                ]
            ];
            assortTable.loyal_level_items[item._id] = 1;
            const quest = this.createItemUnlockQuest(item);
            this.injectItemUnlockQuest(quest);
        }
        return assortTable;
    }
    createItemUnlockQuest(item) {
        // FIXME Use correct name from Locale table
        const itemName = item._name;
        const amount = item._props.StackMaxSize * 3;
        return {
            id: this.getTraderBase()._id + item._id,
            trader_id: this.getTraderBase()._id,
            name: `Unlock ${itemName}`,
            description: `Unlocking ${itemName}`,
            success_message: `Successfully unlocked ${itemName}`,
            missions: [
                {
                    type: "FindItem",
                    accepted_items: [item._id],
                    count: amount,
                    message: `Find in raid ${amount} ${itemName}`
                },
                {
                    type: "GiveItem",
                    accepted_items: [item._id],
                    count: amount,
                    message: `Hand over ${amount} found in raid ${itemName}`,
                    found_in_raid_only: true
                }
            ]
        };
    }
    createTraderItem(item) {
        return {
            _id: item._id,
            _tpl: item._id,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: false,
                StackObjectsCount: item._props.StackMaxSize * 3
            }
        };
    }
}
exports.ExpertTrader = ExpertTrader;
