"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpertTrader = void 0;
const constants_1 = require("./constants");
class ExpertTrader {
    constructor() {
        this.ROUBLE = "5449016a4bdc2d6f028b456f";
    }
    ;
    setMod(mod) {
        this.mod = mod;
    }
    isItemBlacklisted(id) {
        for (const listItem in constants_1.Blacklist.List) {
            if (constants_1.Blacklist.List[listItem] == id)
                return true;
        }
        console.log(id);
        return false;
    }
    setDatabaseServer(databaseServer) {
        this.databaseServer = databaseServer;
        this.tables = databaseServer.getTables();
    }
}
exports.ExpertTrader = ExpertTrader;
