import { ExpertTrader } from "./expert_trader";

import { Insurance, LoyaltyLevel, Repair } from "@spt-aki/models/eft/common/tables/ITrader";
import { ItemParent } from "./constants";

export class PartExpert extends ExpertTrader {

    private ID: string = "af404ba7e96348bb1f942fe4";

    protected getTraderSellCategories(): ItemParent[] {
        return [
            ItemParent.Bipod,
            ItemParent.Collimator,
            ItemParent.Flashlight,
            ItemParent.Foregrip,
            ItemParent.Gasblock,
            ItemParent.FlashHider,
            ItemParent.MuzzleCombo,
            ItemParent.Silencer,
            ItemParent.Muzzle,
            ItemParent.AssaultScope,
            ItemParent.CompactCollimator,
            ItemParent.IronSight,
            ItemParent.OpticScope,
            ItemParent.NightVision,
            ItemParent.SpecialScope,
            ItemParent.ThermalVision,
            ItemParent.Sights,
            ItemParent.TacticalCombo,
            ItemParent.AuxiliaryMod,
            ItemParent.Charge,
            ItemParent.Magazine,
            ItemParent.CylinderMagazine,
            ItemParent.Mount,
            ItemParent.Stock,
            ItemParent.Barrel,
            ItemParent.Handguard,
            ItemParent.PistolGrip,
            ItemParent.Receiver
        ];
    }

    protected getTraderInsurance(): Insurance {
        return {
            availability: false,
            excluded_category: [],
            max_return_hour: 0,
            max_storage_time: 0,
            min_payment: 0,
            min_return_hour: 0,
        };
    }

    protected getTraderLoyalityLevels(): LoyaltyLevel[] {
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

    protected getTraderRepair(): Repair {
        return {
            availability: false,
            currency: this.ROUBLE,
            currency_coefficient: 1,
            excluded_category: [],
            excluded_id_list: [],
            quality: "2",
        };
    }

    public createTraderBase() {
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

            refreshAssort: false, // FIXME
            buyer_up: false, // FIXME

            insurance: this.getTraderInsurance(),
            loyaltyLevels: this.getTraderLoyalityLevels(),
            repair: this.getTraderRepair(),
        }
    }

}