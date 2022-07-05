"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarterExpert = void 0;
const expert_trader_1 = require("./expert_trader");
const constants_1 = require("./constants");
class BarterExpert extends expert_trader_1.ExpertTrader {
    constructor() {
        super(...arguments);
        this.ID = "fe9bdfa6671fa790624c7102";
    }
    getTraderSellCategories() {
        return [
            constants_1.ItemParent.Battery,
            constants_1.ItemParent.BuildingMaterial,
            constants_1.ItemParent.Electronics,
            constants_1.ItemParent.HouseholdGoods,
            constants_1.ItemParent.Jewelry,
            constants_1.ItemParent.Fuel,
            constants_1.ItemParent.Lubricant,
            constants_1.ItemParent.MedicalSupplies,
            constants_1.ItemParent.Other,
            constants_1.ItemParent.Tool
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
            name: "Barter",
            nickname: "Barter Expert",
            surname: "Expert",
            avatar: "/files/trader/avatar/barter_expert.png",
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
exports.BarterExpert = BarterExpert;
