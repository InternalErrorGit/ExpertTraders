"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalExpert = void 0;
const expert_trader_1 = require("./expert_trader");
const constants_1 = require("./constants");
class MedicalExpert extends expert_trader_1.ExpertTrader {
    constructor() {
        super(...arguments);
        this.ID = "de82dbf3bd360af04bb606ab";
    }
    getTraderSellCategories() {
        return [
            constants_1.ItemParent.Stimulator,
            constants_1.ItemParent.Medical,
            constants_1.ItemParent.MedKit,
            constants_1.ItemParent.Drugs,
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
            name: "Medical",
            nickname: "Medical Expert",
            surname: "Expert",
            avatar: "/files/trader/avatar/medical_expert.png",
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
exports.MedicalExpert = MedicalExpert;
