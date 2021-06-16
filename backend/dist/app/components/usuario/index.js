"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_network_1 = __importDefault(require("./usuario.network"));
const usuario = express_1.default();
usuario.use('/usuario', usuario_network_1.default);
exports.default = usuario;
