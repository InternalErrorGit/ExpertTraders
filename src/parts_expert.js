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
exports.PartExpert = void 0;
const expert_trader_1 = require("./expert_trader");
const ConfigTypes_1 = require("../../../../Aki_data/Server/lib/models/enums/ConfigTypes");
const json = __importStar(require("../db/part_expert.json"));
const constants_1 = require("./constants");
class PartExpert extends expert_trader_1.ExpertTrader {
    constructor() {
        super();
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
            if (parent != constants_1.ItemParent.Bipod &&
                parent != constants_1.ItemParent.Collimator &&
                parent != constants_1.ItemParent.Flashlight &&
                parent != constants_1.ItemParent.Foregrip &&
                parent != constants_1.ItemParent.Gasblock &&
                parent != constants_1.ItemParent.FlashHider &&
                parent != constants_1.ItemParent.MuzzleCombo &&
                parent != constants_1.ItemParent.Silencer &&
                parent != constants_1.ItemParent.Muzzle &&
                parent != constants_1.ItemParent.AssaultScope &&
                parent != constants_1.ItemParent.CompactCollimator &&
                parent != constants_1.ItemParent.IronSight &&
                parent != constants_1.ItemParent.OpticScope &&
                parent != constants_1.ItemParent.NightVision &&
                parent != constants_1.ItemParent.SpecialScope &&
                parent != constants_1.ItemParent.ThermalVision &&
                parent != constants_1.ItemParent.Sights &&
                parent != constants_1.ItemParent.TacticalCombo &&
                parent != constants_1.ItemParent.AuxiliaryMod &&
                parent != constants_1.ItemParent.Charge &&
                parent != constants_1.ItemParent.Magazine &&
                parent != constants_1.ItemParent.CylinderMagazine &&
                parent != constants_1.ItemParent.Mount &&
                parent != constants_1.ItemParent.Stock &&
                parent != constants_1.ItemParent.Barrel &&
                parent != constants_1.ItemParent.Handguard &&
                parent != constants_1.ItemParent.PistolGrip &&
                parent != constants_1.ItemParent.Receiver)
                continue;
            if (this.isItemBlacklisted(item._id))
                continue;
            const amount = item._props.StackMaxSize;
            const traderItem = {
                _id: item._id,
                _tpl: item._id,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: false,
                    StackObjectsCount: item._props.StackMaxSize * 3
                }
            };
            assortTable.items.push(traderItem);
            const price = this.tables.templates.prices[item._id];
            assortTable.barter_scheme[item._id] = [
                [
                    {
                        count: price,
                        _tpl: this.ROUBLE
                    }
                ]
            ];
            assortTable.loyal_level_items[item._id] = 1;
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
        const imageFilepath = `./${initialModLoader.getModPath("ExpertTraders")}res`;
        const imageRouter = container.resolve("ImageRouter");
        imageRouter.addRoute(json.avatar.replace(".png", ""), `${imageFilepath}/${json._id}.png`);
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
exports.PartExpert = PartExpert;
