"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmmunitionExpert = void 0;
const expert_trader_1 = require("./expert_trader");
const ConfigTypes_1 = require("../../../../Aki_data/Server/lib/models/enums/ConfigTypes");
const json = __importStar(require("../db/ammunition_expert.json"));
const constants_1 = require("./constants");
class AmmunitionExpert extends expert_trader_1.ExpertTrader {
    constructor() {
        super();
        this.items = {
            Ammo: "5485a8684bdc2da71d8b4567",
            AmmoBox: "543be5cb4bdc2deb348b4568"
        };
    }
    createAssortTable() {
        const assortTable = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        };
        for (const key in this.tables.templates.items) {
            const item = this.tables.templates.items[key];
            const parent = item._parent;
            if (parent != constants_1.ItemParent.Ammo && parent != constants_1.ItemParent.AmmoBox)
                continue;
            const traderItem = {
                _id: item._id,
                _tpl: item._id,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 999999999
                }
            };
            assortTable.items.push(traderItem);
            assortTable.barter_scheme[item._id] = [
                [
                    {
                        count: 1,
                        _tpl: this.ROUBLE
                    }
                ]
            ];
            assortTable.loyal_level_items[item._id] = 1;
            const questId = item._name + "_quest";
            const description = questId + "_description";
            const name = questId + "_name";
            const note = questId + "_note";
            const startedMessageText = questId + "_description";
            const failMessageText = questId + "_failMessageText";
            const successMessageText = questId + "_successMessageText";
            const changeQuestMessageText = questId + "_changeQuestMessageText";
            const itemQuest = {
                QuestName: item._name,
                _id: questId,
                canShowNotificationsInGame: true,
                conditions: {
                    Started: [],
                    AvailableForFinish: [{
                            _parent: "FindItem",
                            _props: {
                                dogtagLevel: 0,
                                id: "5968ed3186f77420d2328013",
                                index: 0,
                                maxDurability: 100,
                                minDurability: 0,
                                parentId: "",
                                onlyFoundInRaid: true,
                                dynamicLocale: false,
                                target: [
                                    "55d482194bdc2d1d4e8b456b"
                                ],
                                value: 3,
                                visibilityConditions: []
                            },
                            dynamicLocale: false
                        }],
                    AvailableForStart: [],
                    Success: [],
                    Fail: []
                },
                description: description,
                failMessageText: failMessageText,
                name: name,
                note: note,
                traderId: "5935c25fb3acc3127c3d8cd9",
                location: "5704e3c2d2720bac5b8b4567",
                image: "/files/quest/icon/59c26f2b86f7744a351903d3.jpg",
                type: "PickUp",
                isKey: false,
                restartable: false,
                instantComplete: false,
                secretQuest: false,
                startedMessageText: startedMessageText,
                successMessageText: successMessageText,
                templateId: questId,
                rewards: {
                    AvailableForStart: [],
                    AvailableForFinish: [],
                    Started: [],
                    Success: [{
                            value: "5200",
                            id: "60c8abe52238043a5267862f",
                            type: "Experience",
                            index: 0
                        }],
                    Fail: [],
                    FailRestartable: [],
                    Expired: []
                },
                status: "",
                KeyQuest: false,
                changeQuestMessageText: changeQuestMessageText,
            };
            this.tables.templates.quests[questId] = itemQuest;
        }
        return assortTable;
    }
    getTraderLocale() {
        return {
            FullName: json.nickname,
            FirstName: json.name,
            Nickname: json.nickname,
            Location: json.location,
            Description: json.location
        };
    }
    registerProfileImage(container) {
        const initialModLoader = container.resolve("InitialModLoader");
        const imageFilepath = `./${initialModLoader.getModPath(this.mod)}res`;
        const imageRouter = container.resolve("ImageRouter");
        imageRouter.addRoute(json.avatar.replace(".jpg", ""), `${imageFilepath}/${json._id}.jpg`);
    }
    setupTraderUpdateTime(container) {
        const configServer = container.resolve("ConfigServer");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const traderRefreshConfig = { traderId: json._id, seconds: 3600 };
        traderConfig.updateTime.push(traderRefreshConfig);
    }
    getTraderId() {
        return json._id;
    }
    getJson() {
        return json;
    }
}
exports.AmmunitionExpert = AmmunitionExpert;
