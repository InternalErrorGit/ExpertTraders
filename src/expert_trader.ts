import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILocaleTradingProps } from "@spt-aki/models/spt/server/ILocaleBase";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { Blacklist, ItemParent } from "./constants";


export abstract class ExpertTrader {

    protected mod: string;
    protected tables: IDatabaseTables;
    protected databaseServer: DatabaseServer;
    protected ROUBLE: string = "5449016a4bdc2d6f028b456f";;


    public abstract registerProfileImage(container: DependencyContainer): void;
    public abstract setupTraderUpdateTime(container: DependencyContainer): void;
    public abstract getTraderId(): string;
    public abstract createAssortTable(): ITraderAssort;
    public abstract getTraderLocale(): ILocaleTradingProps;
    public abstract getJson(): any;

    public setMod(mod: string): void {
        this.mod = mod;
    }

    public isItemBlacklisted(id: string): boolean{
        for(const listItem in Blacklist.List){
            if(Blacklist.List[listItem] == id) return true;
        }
        return false;
    }
    
    public setDatabaseServer(databaseServer: DatabaseServer): void {
        this.databaseServer = databaseServer;
        this.tables = databaseServer.getTables();
    }
}