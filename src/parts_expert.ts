import { ExpertTrader } from "./expert_trader";

import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILocaleTradingProps } from "@spt-aki/models/spt/server/ILocaleBase";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DependencyContainer } from "tsyringe";
import * as json from "../db/part_expert.json";
import { ItemParent } from "./constants";

export class PartExpert extends ExpertTrader {


    constructor() {
        super();
    }

    public createAssortTable(): ITraderAssort {

        const assortTable: ITraderAssort = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }

        for (const key in this.tables.templates.items) {
            const item = this.tables.templates.items[key];
            const parent = item._parent;


            if (
                parent != ItemParent.Bipod &&
                parent != ItemParent.Collimator &&
                parent != ItemParent.Flashlight &&
                parent != ItemParent.Foregrip &&
                parent != ItemParent.Gasblock &&
                parent != ItemParent.FlashHider &&
                parent != ItemParent.MuzzleCombo &&
                parent != ItemParent.Silencer &&
                parent != ItemParent.Muzzle &&
                parent != ItemParent.AssaultScope &&
                parent != ItemParent.CompactCollimator &&
                parent != ItemParent.IronSight &&
                parent != ItemParent.OpticScope &&
                parent != ItemParent.NightVision &&
                parent != ItemParent.SpecialScope &&
                parent != ItemParent.ThermalVision &&
                parent != ItemParent.Sights &&
                parent != ItemParent.TacticalCombo &&
                parent != ItemParent.AuxiliaryMod &&
                parent != ItemParent.Charge &&
                parent != ItemParent.Magazine &&
                parent != ItemParent.CylinderMagazine &&
                parent != ItemParent.Mount &&
                parent != ItemParent.Stock &&
                parent != ItemParent.Barrel &&
                parent != ItemParent.Handguard &&
                parent != ItemParent.PistolGrip &&
                parent != ItemParent.Receiver
            ) continue;


            if(this.isItemBlacklisted(item._id)) continue;
            const amount: number = item._props.StackMaxSize;

            const traderItem: Item = {
                _id: item._id,
                _tpl: item._id,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: false,
                    StackObjectsCount: item._props.StackMaxSize*3
                }
            };


            assortTable.items.push(traderItem);

            const price: number = this.tables.templates.prices[item._id];


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

    public getTraderLocale(): ILocaleTradingProps {
        return {
            FullName: json.nickname,
            FirstName: json.name,
            Nickname: json.nickname,
            Location: json.location,
            Description: json.location
        };
    }

    public registerProfileImage(container: DependencyContainer): void {
        const initialModLoader = container.resolve<InitialModLoader>("InitialModLoader");
        const imageFilepath = `./${initialModLoader.getModPath("ExpertTraders")}res`;
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(json.avatar.replace(".png", ""), `${imageFilepath}/${json._id}.png`);
    }

    public setupTraderUpdateTime(container: DependencyContainer): void {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = { traderId: json._id, seconds: 3600 }
        traderConfig.updateTime.push(traderRefreshConfig);
    }

    public getTraderId(): string {
        return json._id;
    }
    public getJson() {
        return json;
    }

}