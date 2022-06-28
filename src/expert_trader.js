"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertTrader = void 0;
class ExpertTrader {
    constructor() {
        this.ROUBLE = "5449016a4bdc2d6f028b456f";
    }
    ;
    setMod(mod) {
        this.mod = mod;
    }
    setDatabaseServer(databaseServer) {
        this.databaseServer = databaseServer;
        this.tables = databaseServer.getTables();
    }
}
exports.ExpertTrader = ExpertTrader;
