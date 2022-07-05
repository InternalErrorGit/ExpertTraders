import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { Insurance, ITraderAssort, ITraderBase, LoyaltyLevel, Repair } from "@spt-aki/models/eft/common/tables/ITrader";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILocaleTradingProps } from "@spt-aki/models/spt/server/ILocaleBase";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

import { DependencyContainer } from "tsyringe";
import { Constants, ItemParent } from "./constants";


export abstract class ExpertTrader {

    public setDatabaseServer(databaseServer: DatabaseServer): void {
        this.databaseServer = databaseServer;
    }

    protected ROUBLE: string = "5449016a4bdc2d6f028b456f";
    protected traderBase: ITraderBase;
    protected databaseServer: DatabaseServer;
    protected traderAssort: ITraderAssort;
    protected traderLocale: ILocaleTradingProps

    public abstract createTraderBase(): void;
    protected abstract getTraderSellCategories(): ItemParent[];
    protected abstract getTraderInsurance(): Insurance;
    protected abstract getTraderLoyalityLevels(): LoyaltyLevel[];
    protected abstract getTraderRepair(): Repair;

    public createTraderLocale(): void {
        this.traderLocale = {
            FullName: this.getTraderBase().nickname,
            FirstName: this.getTraderBase().name,
            Nickname: this.getTraderBase().nickname,
            Location: this.getTraderBase().location,
            Description: this.getTraderBase().location
        };
    }

    public getTraderLocale(): ILocaleTradingProps {
        return this.traderLocale;
    }

    public createTraderAssort(): void {
        this.traderAssort = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }
    }

    public getTraderBase(): ITraderBase {
        return this.traderBase;
    }

    public registerProfileImage(container: DependencyContainer): void {
        const initialModLoader = container.resolve<InitialModLoader>("InitialModLoader");
        const imageFilepath = `./${initialModLoader.getModPath("ExpertTraders")}res`;
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(this.traderBase.avatar.replace(".png", ""), `${imageFilepath}/${this.traderBase._id}.png`);
    }

    public setupTraderUpdateTime(container: DependencyContainer): void {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = { traderId: this.traderBase._id, seconds: 3600 }
        traderConfig.updateTime.push(traderRefreshConfig);
    }

    protected isTraderItemValid(item: ITemplateItem): boolean {

        for (const key in Constants.itemBlacklist) {
            const value = Constants.itemBlacklist[key];
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

    protected injectItemUnlockQuest(quest) {
        if (!globalThis.CustomQuestsAPI) {
            return;
        }
        globalThis.CustomQuestsAPI.load([quest]);
    }

    public getTraderAssort(): ITraderAssort {
        this.createTraderAssort();
        const assortTable = this.traderAssort;
        const tables = this.databaseServer.getTables();

        for (const key in tables.templates.items) {
            const item = tables.templates.items[key];
            if (!this.isTraderItemValid(item)) continue;
            assortTable.items.push(this.createTraderItem(item));
            const itemPrice: number = tables.templates.prices[item._id];
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

    protected createItemUnlockQuest(item: ITemplateItem) {
        // FIXME Use correct name from Locale table
        const itemName = item._name;
        const amount = item._props.StackMaxSize*3;
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

    protected createTraderItem(item: ITemplateItem) {
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