import { DependencyContainer } from "tsyringe";

// SPT types
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ILocaleGlobalBase } from "@spt-aki/models/spt/server/ILocaleBase";

// The new trader config
import * as baseJson from "../db/base.json";
import { ExpertTrader } from "./expert_trader";
import { AmmunitionExpert } from "./ammunition_expert";

class SampleTrader implements IMod {

    private mod: string;
    private logger: ILogger;

    private traders: ExpertTrader[] = [
        new AmmunitionExpert()
    ]


    constructor() {
        this.mod = "Expert Traders";
    }

    public load(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        this.logger.debug(`[${this.mod}] Loading... `);

        this.traders.forEach(function (trader) {
            trader.registerProfileImage(container);
            trader.setupTraderUpdateTime(container);
        });

        this.logger.debug(`[${this.mod}] Loaded`);
    }

    public delayedLoad(container: DependencyContainer): void {
        this.logger.debug(`[${this.mod}] Delayed Loading... `);

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const jsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const tables = databaseServer.getTables();

        this.traders.forEach(function (trader) {
            trader.setDatabaseServer(databaseServer);

            tables.traders[trader.getTraderId()] = {
                assort: trader.createAssortTable(),
                base: jsonUtil.deserialize(jsonUtil.serialize(trader.getJson())) as ITraderBase,
                questassort: undefined
            };

            const locales = Object.values(tables.locales.global) as ILocaleGlobalBase[];
            for (const locale of locales) {
                locale.trading[trader.getJson()._id] =  trader.getTraderLocale();
            }
        });

        this.logger.debug(`[${this.mod}] Delayed Loaded`);
    }
}

module.exports = { mod: new SampleTrader() }