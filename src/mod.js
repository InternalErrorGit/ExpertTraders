"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ammunition_expert_1 = require("./ammunition_expert");
class SampleTrader {
    constructor() {
        this.traders = [
            new ammunition_expert_1.AmmunitionExpert()
        ];
        this.mod = "Expert Traders";
    }
    load(container) {
        this.logger = container.resolve("WinstonLogger");
        this.logger.debug(`[${this.mod}] Loading... `);
        this.traders.forEach(function (trader) {
            trader.registerProfileImage(container);
            trader.setupTraderUpdateTime(container);
        });
        this.logger.debug(`[${this.mod}] Loaded`);
    }
    delayedLoad(container) {
        this.logger.debug(`[${this.mod}] Delayed Loading... `);
        const databaseServer = container.resolve("DatabaseServer");
        const jsonUtil = container.resolve("JsonUtil");
        const tables = databaseServer.getTables();
        this.traders.forEach(function (trader) {
            trader.setDatabaseServer(databaseServer);
            tables.traders[trader.getTraderId()] = {
                assort: trader.createAssortTable(),
                base: jsonUtil.deserialize(jsonUtil.serialize(trader.getJson())),
                questassort: undefined
            };
            const locales = Object.values(tables.locales.global);
            for (const locale of locales) {
                locale.trading[trader.getJson()._id] = trader.getTraderLocale();
            }
        });
        this.logger.debug(`[${this.mod}] Delayed Loaded`);
    }
}
module.exports = { mod: new SampleTrader() };
