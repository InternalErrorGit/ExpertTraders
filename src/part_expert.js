"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartExpert = void 0;
const expert_trader_1 = require("./expert_trader");
const constants_1 = require("./constants");
class PartExpert extends expert_trader_1.ExpertTrader {
    constructor() {
        super(...arguments);
        this.ID = "af404ba7e96348bb1f942fe4";
    }
    getTraderSellCategories() {
        return [
            constants_1.ItemParent.Bipod,
            constants_1.ItemParent.Collimator,
            constants_1.ItemParent.Flashlight,
            constants_1.ItemParent.Foregrip,
            constants_1.ItemParent.Gasblock,
            constants_1.ItemParent.FlashHider,
            constants_1.ItemParent.MuzzleCombo,
            constants_1.ItemParent.Silencer,
            constants_1.ItemParent.Muzzle,
            constants_1.ItemParent.AssaultScope,
            constants_1.ItemParent.CompactCollimator,
            constants_1.ItemParent.IronSight,
            constants_1.ItemParent.OpticScope,
            constants_1.ItemParent.NightVision,
            constants_1.ItemParent.SpecialScope,
            constants_1.ItemParent.ThermalVision,
            constants_1.ItemParent.Sights,
            constants_1.ItemParent.TacticalCombo,
            constants_1.ItemParent.AuxiliaryMod,
            constants_1.ItemParent.Charge,
            constants_1.ItemParent.Magazine,
            constants_1.ItemParent.CylinderMagazine,
            constants_1.ItemParent.Mount,
            constants_1.ItemParent.Stock,
            constants_1.ItemParent.Barrel,
            constants_1.ItemParent.Handguard,
            constants_1.ItemParent.PistolGrip,
            constants_1.ItemParent.Receiver
        ];
    }
    getTraderInsurance() {
        return {
            availability: false,
            excluded_category: [],
            max_return_hour: 0,
            max_storage_time: 0,
            min_payment: 0,
            min_return_hour: 0,
        };
    }
    getTraderLoyalityLevels() {
        return [{
                buy_price_coef: 0,
                exchange_price_coef: 0,
                heal_price_coef: 0,
                insurance_price_coef: 0,
                minLevel: 1,
                minSalesSum: 0,
                minStanding: 0,
                repair_price_coef: 0,
            }];
    }
    getTraderRepair() {
        return {
            availability: false,
            currency: this.ROUBLE,
            currency_coefficient: 1,
            excluded_category: [],
            excluded_id_list: [],
            quality: "2",
        };
    }
    createTraderBase() {
        this.traderBase = {
            _id: this.ID,
            name: "Part",
            nickname: "Part Expert",
            surname: "Expert",
            avatar: "/files/trader/avatar/part_expert.png",
            unlockedByDefault: true,
            customization_seller: false,
            location: "Reserve",
            currency: "RUB",
            balance_dol: 0,
            balance_eur: 0,
            balance_rub: 5000000,
            discount: 0,
            discount_end: 0,
            nextResupply: 1615141448,
            sell_category: this.getTraderSellCategories(),
            gridHeight: 150,
            medic: false,
            refreshAssort: false,
            buyer_up: false,
            insurance: this.getTraderInsurance(),
            loyaltyLevels: this.getTraderLoyalityLevels(),
            repair: this.getTraderRepair(),
        };
    }
}
exports.PartExpert = PartExpert;
