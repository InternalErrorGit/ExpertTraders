import { ExpertTrader } from "./expert_trader";

import { Insurance, LoyaltyLevel, Repair } from "@spt-aki/models/eft/common/tables/ITrader";
import { ItemParent } from "./constants";

export class WeaponExpert extends ExpertTrader {

    private ID: string = "afd308634e862f32e42918f6";

    protected getTraderSellCategories(): ItemParent[] {
        return [
            ItemParent.AssaultCarbine,
            ItemParent.AssaultRifle,
            ItemParent.SniperRifle,
            ItemParent.GrenadeLauncher,
            ItemParent.MachineGun,
            ItemParent.MarksmanRifle,
            ItemParent.Knife,
            ItemParent.Pistol,
            ItemParent.Revolver,
            ItemParent.Shotgun,
            ItemParent.Smg,
            ItemParent.ThrowWeap
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
            name: "Weapon",
            nickname: "Weapon Expert",
            surname: "Expert",
            avatar: "/files/trader/avatar/weapon_expert.png",

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