"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ammunition_expert_1 = require("./ammunition_expert");
const barter_expert_1 = require("./barter_expert");
const equipment_expert_1 = require("./equipment_expert");
const medical_expert_1 = require("./medical_expert");
const part_expert_1 = require("./part_expert");
const weapon_expert_1 = require("./weapon_expert");
class SampleTrader {
    constructor() {
        this.traders = [
            new ammunition_expert_1.AmmunitionExpert(),
            new barter_expert_1.BarterExpert(),
            new equipment_expert_1.EquipmentExpert(),
            new medical_expert_1.MedicalExpert(),
            new part_expert_1.PartExpert(),
            new weapon_expert_1.WeaponExpert()
        ];
        this.mod = "ExpertTraders";
    }
    load(container) {
        this.logger = container.resolve("WinstonLogger");
        const hashUtil = container.resolve("HashUtil");
        this.logger.debug(`[${this.mod}] Loading... `);
        this.traders.forEach(function (trader) {
            trader.createTraderBase();
            trader.registerProfileImage(container);
            trader.setupTraderUpdateTime(container);
        });
        this.logger.debug(`[${this.mod}] Loaded`);
    }
    delayedLoad(container) {
        this.logger.debug(`[${this.mod}] Delayed Loading... `);
        if (!globalThis.CustomQuestsAPI) {
            console.error(`CustomQuestsAPI not found, are you sure a version of CustomQuests >= 2.2.0 is installed ?`);
        }
        const databaseServer = container.resolve("DatabaseServer");
        const tables = databaseServer.getTables();
        this.traders.forEach(function (trader) {
            trader.setDatabaseServer(databaseServer);
            tables.traders[trader.getTraderBase()._id] = {
                assort: trader.getTraderAssort(),
                base: trader.getTraderBase(),
                questassort: undefined
            };
            const locales = Object.values(tables.locales.global);
            for (const locale of locales) {
                locale.trading[trader.getTraderBase()._id] = trader.getTraderLocale();
            }
        });
        this.logger.debug(`[${this.mod}] Delayed Loaded`);
    }
}
module.exports = { mod: new SampleTrader() };
