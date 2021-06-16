"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_network_1 = __importDefault(require("./producto.network"));
const producto = express_1.default();
producto.use('/producto', producto_network_1.default);
exports.default = producto;
