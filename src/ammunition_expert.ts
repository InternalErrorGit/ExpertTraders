import { ExpertTrader } from "./expert_trader";

import { InitialModLoader } from "@spt-aki/loaders/InitialModLoader";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { IQuest } from "@spt-aki/models/eft/common/tables/IQuest";
import { ITraderAssort } from "@spt-aki/models/eft/common/tables/ITrader";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { ILocaleTradingProps } from "@spt-aki/models/spt/server/ILocaleBase";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { DependencyContainer } from "tsyringe";
import * as json from "../db/ammunition_expert.json";
import { ItemParent } from "./constants";

export class AmmunitionExpert extends ExpertTrader {

    private items = {
        Ammo: "5485a8684bdc2da71d8b4567",
        AmmoBox: "543be5cb4bdc2deb348b4568"
    }

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


            if (parent != ItemParent.Ammo && parent != ItemParent.AmmoBox) continue;

            const traderItem: Item = {
                _id: item._id,
                _tpl: item._id,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 999999999
                }
            };

            assortTable.items.push(traderItem);

            assortTable.barter_scheme[item._id] = [
                [
                    {
                        count: 1,
                        _tpl: this.ROUBLE
                    }
                ]
            ];

            assortTable.loyal_level_items[item._id] = 1;

            console.log(item._props.Rarity);

            const questId: string = item._name + "_quest";
            const description: string = questId + "_description";
            const name: string = questId + "_name";
            const note: string = questId + "_note";
            const startedMessageText: string = questId + "_description";
            const failMessageText: string = questId + "_failMessageText";
            const successMessageText: string = questId + "_successMessageText";
            const changeQuestMessageText: string = questId + "_changeQuestMessageText";

            const itemQuest: IQuest = {
                QuestName: item._name,
                _id: questId,
                canShowNotificationsInGame: true,
                conditions: {
                    Started: [],
                    AvailableForFinish: [{
                        _parent: "FindItem",
                        _props: {
                            dogtagLevel: 0,
                            id: "5968ed3186f77420d2328013",
                            index: 0,
                            maxDurability: 100,
                            minDurability: 0,
                            parentId: "",
                            onlyFoundInRaid: true,
                            dynamicLocale: false,
                            target: [
                                "55d482194bdc2d1d4e8b456b"
                            ],
                            value: 3,
                            visibilityConditions: []
                        },
                        dynamicLocale: false
                    }],
                    AvailableForStart: [],
                    Success: [],
                    Fail: []
                },
                description: description,
                failMessageText: failMessageText,
                name: name,
                note: note,
                traderId: json._id,
                location: "5704e3c2d2720bac5b8b4567",
                image: "/files/quest/icon/59c26f2b86f7744a351903d3.jpg",
                type: "PickUp",
                isKey: false,
                restartable: false,
                instantComplete: false,
                secretQuest: false,
                startedMessageText: startedMessageText,
                successMessageText: successMessageText,
                templateId: "",
                rewards: {
                    AvailableForStart: [],
                    AvailableForFinish: [],
                    Started: [],
                    Success: [{
                        value: "5200",
                        id: "60c8abe52238043a5267862f",
                        type: "Experience",
                        index: 0
                    }],
                    Fail: [],
                    FailRestartable: [],
                    Expired: []
                },
                status: "",
                KeyQuest: false,
                changeQuestMessageText: changeQuestMessageText,
            }

          //  this.tables.templates.quests[questId] = itemQuest;

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
        const imageFilepath = `./${initialModLoader.getModPath(this.mod)}res`;
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(json.avatar.replace(".jpg", ""), `${imageFilepath}/${json._id}.jpg`);
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