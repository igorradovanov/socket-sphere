"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jest_mock_1 = __importDefault(require("jest-mock"));
global.setImmediate = global.setTimeout;
global.io = function () { return ({
    emit: jest_mock_1.default.fn(),
    on: jest_mock_1.default.fn(),
}); };
