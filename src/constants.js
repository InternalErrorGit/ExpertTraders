"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemParent = exports.Blacklist = void 0;
class Blacklist {
}
exports.Blacklist = Blacklist;
Blacklist.List = [
    "5943d9c186f7745a13413ac9",
    "5996f6fc86f7745e585b4de3",
    "5996f6d686f77467977ba6cc",
    "5996f6cb86f774678763a6ca",
    "5cde8864d7f00c0010373be1",
    "5d2f2ab648f03550091993ca",
    "6241c316234b593b5676b637",
    "5a687e7886f7740c4a5133fb",
    "5939a00786f7742fe8132936",
    "5937fc6786f7742cab753590",
    "590de92486f77423d9312a33",
    "5937fd0086f7742bf33fc198",
    "5af04c0b86f774138708f78e",
    "5b4c72b386f7745b453af9c0",
    "5b4c72c686f77462ac37e907",
    "609267a2bb3f46069c3e6c7d",
    "60c080eb991ac167ad1c3ad4",
    "619252352be33f26043400a7",
    "593a87af86f774122f54a951",
    "5b43237186f7742f3a4ab252",
    "5b4c81a086f77417d26be63f",
    "5b4c81bd86f77418a75ae159",
    "58ac60eb86f77401897560ff",
    "5c0a794586f77461c458f892",
    "61bc85697113f767765c7fe7",
    "61bcc89aef0f505f0c6cd0fc",
    "590dde5786f77405e71908b2",
    "5910922b86f7747d96753483",
    "61b9e1aaef9a1b5d6a79899a",
    "5e99711486f7744bfc4af328",
    "5e99735686f7744bfc4af32c",
    "5a0448bc86f774736f14efa8",
    "5d53f4b7a4b936793d58c780",
    "5dcbd56fdbd3d91b3e5468d5",
    "5e81ebcd8e146c7080625e15",
    "5e848cc2988a8701445df1e8",
    "6087e570b998180e9f76dc24",
    "5cdeb229d7f00c000e7ce174",
    "5d52cc5ba4b9367408500062"
];
var ItemParent;
(function (ItemParent) {
    //   Inventory = "55d720f24bdc2d88028b456d",
    //   Pockets = "557596e64bdc2dc2118b4571",
    //   SearchableItem = "566168634bdc2d144c8b456c",
    //   SortingTable = "6050cac987d3f925bf016837",
    //   Stash = "566abbb64bdc2d144c8b457d",
    //     
    //   Equipment = "543be5f84bdc2dd4348b456a",
    //   CompoundItem = "566162e44bdc2d3f298b4573",
    //   Info = "5448ecbe4bdc2d60728b4568",
    //   SpecItem = "5447e0e74bdc2d3c308b4567",
    //
    //   StackableItem = "5661632d4bdc2d903d8b456b",
    //   Item = "54009119af1c881c07000029",
    //#region Barter Items
    ItemParent["Battery"] = "57864ee62459775490116fc1";
    ItemParent["BuildingMaterial"] = "57864ada245977548638de91";
    ItemParent["Electronics"] = "57864a66245977548f04a81f";
    ItemParent["HouseholdGoods"] = "57864c322459775490116fbf";
    ItemParent["Jewelry"] = "57864a3d24597754843f8721";
    ItemParent["Fuel"] = "5d650c3e815116009f6201d2";
    ItemParent["Lubricant"] = "57864e4c24597754843f8723";
    ItemParent["MedicalSupplies"] = "57864c8c245977548867e7f1";
    ItemParent["Other"] = "590c745b86f7743cc433c5f2";
    ItemParent["Tool"] = "57864bb7245977548b3b66c2";
    //#endregion Barter Items
    //#region Gear
    ItemParent["Vest"] = "5448e5284bdc2dcb718b4567";
    ItemParent["Backpack"] = "5448e53e4bdc2d60728b4567";
    ItemParent["Armor"] = "5448e54d4bdc2dcc718b4568";
    ItemParent["ArmBand"] = "5b3f15d486f77432d0509248";
    ItemParent["Visors"] = "5448e5724bdc2ddf718b4568";
    ItemParent["FaceCover"] = "5a341c4686f77469e155819e";
    ItemParent["ArmoredEquipment"] = "57bef4c42459772e8d35a53b";
    ItemParent["Headwear"] = "5a341c4086f77401f2541505";
    ItemParent["Headphones"] = "5645bcb74bdc2ded0b8b4578";
    ItemParent["SimpleContainer"] = "5795f317245977243854e041";
    ItemParent["LockableContainer"] = "5671435f4bdc2d96058b4569";
    ItemParent["MobContainer"] = "5448bf274bdc2dfc2f8b456a";
    //#endregion Gear
    //#region Weapon Parts & Mods
    ItemParent["Bipod"] = "55818afb4bdc2dde698b456d";
    ItemParent["Collimator"] = "55818ad54bdc2ddc698b4569";
    ItemParent["Flashlight"] = "55818b084bdc2d5b648b4571";
    ItemParent["Foregrip"] = "55818af64bdc2d5b648b4570";
    ItemParent["Gasblock"] = "56ea9461d2720b67698b456f";
    ItemParent["FlashHider"] = "550aa4bf4bdc2dd6348b456b";
    ItemParent["MuzzleCombo"] = "550aa4dd4bdc2dc9348b4569";
    ItemParent["Silencer"] = "550aa4cd4bdc2dd8348b456c";
    ItemParent["Muzzle"] = "5448fe394bdc2d0d028b456c";
    ItemParent["AssaultScope"] = "55818add4bdc2d5b648b456f";
    ItemParent["CompactCollimator"] = "55818acf4bdc2dde698b456b";
    ItemParent["IronSight"] = "55818ac54bdc2d5b648b456e";
    ItemParent["OpticScope"] = "55818ae44bdc2dde698b456c";
    ItemParent["NightVision"] = "5a2c3a9486f774688b05e574";
    ItemParent["SpecialScope"] = "55818aeb4bdc2ddc698b456a";
    ItemParent["ThermalVision"] = "5d21f59b6dbe99052b54ef83";
    ItemParent["Sights"] = "5448fe7a4bdc2d6f028b456b";
    ItemParent["TacticalCombo"] = "55818b164bdc2ddc698b456c";
    ItemParent["AuxiliaryMod"] = "5a74651486f7744e73386dd1";
    ItemParent["Charge"] = "55818a6f4bdc2db9688b456b";
    ItemParent["Magazine"] = "5448bc234bdc2d3c308b4569";
    ItemParent["CylinderMagazine"] = "610720f290b75a49ff2e5e25";
    ItemParent["Mount"] = "55818b224bdc2dde698b456f";
    ItemParent["Stock"] = "55818a594bdc2db9688b456a";
    ItemParent["Barrel"] = "555ef6e44bdc2de9068b457e";
    ItemParent["Handguard"] = "55818a104bdc2db9688b4569";
    ItemParent["PistolGrip"] = "55818a684bdc2ddd698b456d";
    ItemParent["Receiver"] = "55818a304bdc2db5418b457d";
    //#endregion Weapon Parts & Mods
    //#region Weapons
    ItemParent["AssaultCarbine"] = "5447b5fc4bdc2d87278b4567";
    ItemParent["AssaultRifle"] = "5447b5f14bdc2d61278b4567";
    ItemParent["SniperRifle"] = "5447b6254bdc2dc3278b4568";
    ItemParent["GrenadeLauncher"] = "5447bedf4bdc2d87278b4568";
    ItemParent["MachineGun"] = "5447bed64bdc2d97278b4568";
    ItemParent["MarksmanRifle"] = "5447b6194bdc2d67278b4567";
    ItemParent["Knife"] = "5447e1d04bdc2dff2f8b4567";
    ItemParent["Pistol"] = "5447b5cf4bdc2d65278b4567";
    ItemParent["Revolver"] = "617f1ef5e8b54b0998387733";
    ItemParent["Shotgun"] = "5447b6094bdc2dc3278b4567";
    ItemParent["Smg"] = "5447b5e04bdc2d62278b4567";
    ItemParent["ThrowWeap"] = "543be6564bdc2df4348b4568";
    //#endregion Weapons
    //#region Ammunition
    ItemParent["Ammo"] = "5485a8684bdc2da71d8b4567";
    ItemParent["AmmoBox"] = "543be5cb4bdc2deb348b4568";
    //#endregion Ammunition
    //#region Provisions
    ItemParent["Drink"] = "5448e8d64bdc2dce718b4568";
    ItemParent["Food"] = "5448e8d04bdc2ddf718b4569";
    //#endregion Provisions
    //#region Medication
    ItemParent["Stimulator"] = "5448f3a64bdc2d60728b456a";
    ItemParent["Medical"] = "5448f3ac4bdc2dce718b4569";
    ItemParent["MedKit"] = "5448f39d4bdc2d0a728b4568";
    ItemParent["Drugs"] = "5448f3a14bdc2d27728b4569";
    //#endregion Meditcation
    //#region Keys
    ItemParent["Keycard"] = "5c164d2286f774194c5e69fa";
    ItemParent["KeyMechanical"] = "5c99f98d86f7745c314214b3";
    //#endregion Keys
    //Info Items
    ItemParent["PortableRangeFinder"] = "61605ddea09d851a0a0c1bbc";
    ItemParent["RepairKits"] = "616eb7aea207f41933308f46";
    ItemParent["Compass"] = "5f4fbaaca5573a5ac31db429";
    ItemParent["Map"] = "567849dd4bdc2d150f8b456e";
    ItemParent["Money"] = "543be5dd4bdc2deb348b4569";
})(ItemParent = exports.ItemParent || (exports.ItemParent = {}));
