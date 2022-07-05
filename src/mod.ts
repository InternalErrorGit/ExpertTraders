import { DependencyContainer } from "tsyringe";

// SPT types
import { IMod } from "@spt-aki/models/external/mod";
import { ILocaleGlobalBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

import { HashUtil } from "@spt-aki/utils/HashUtil";
import { AmmunitionExpert } from "./ammunition_expert";
import { ExpertTrader } from "./expert_trader";
import { BarterExpert } from "./barter_expert";
import { EquipmentExpert } from "./equipment_expert";
import { MedicalExpert } from "./medical_expert";
import { PartExpert } from "./part_expert";
import { WeaponExpert } from "./weapon_expert";

class SampleTrader implements IMod {

    private mod: string;
    private logger: ILogger;

    private traders: ExpertTrader[] = [
        new AmmunitionExpert(),
        new BarterExpert(),
        new EquipmentExpert(),
        new MedicalExpert(),
        new PartExpert(),
        new WeaponExpert()
    ]

    constructor() {
        this.mod = "ExpertTraders";
    }

    public load(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");

        this.logger.debug(`[${this.mod}] Loading... `);

        this.traders.forEach(function (trader) {
            trader.createTraderBase();
            trader.registerProfileImage(container);
            trader.setupTraderUpdateTime(container);
        });

        this.logger.debug(`[${this.mod}] Loaded`);
    }

    public delayedLoad(container: DependencyContainer): void {
        this.logger.debug(`[${this.mod}] Delayed Loading... `);

        if (!globalThis.CustomQuestsAPI) {
            console.error(`CustomQuestsAPI not found, are you sure a version of CustomQuests >= 2.2.0 is installed ?`);

        }

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = databaseServer.getTables();

        this.traders.forEach(function (trader) {

            trader.setDatabaseServer(databaseServer);

            tables.traders[trader.getTraderBase()._id] = {
                assort: trader.getTraderAssort(),
                base: trader.getTraderBase(),
                questassort: undefined
            };

            const locales = Object.values(tables.locales.global) as ILocaleGlobalBase[];
            for (const locale of locales) {
                locale.trading[trader.getTraderBase()._id] = trader.getTraderLocale();
            }
        });

        this.logger.debug(`[${this.mod}] Delayed Loaded`);
    }
}

module.exports = { mod: new SampleTrader() }