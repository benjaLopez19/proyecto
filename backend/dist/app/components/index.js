"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const producto_1 = __importDefault(require("./producto"));
const usuario_1 = __importDefault(require("./usuario"));
const components = [
    producto_1.default,
    usuario_1.default
];
exports.default = components;
