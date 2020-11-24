"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const user_1 = require("./user/user");
const test = (app) => {
    app.get('/root', (req, res) => {
        res.send('hello route');
    });
    app.get('/test', (req, res) => {
        res.send('test route is working!');
    });
    user_1.user(app);
};
exports.router = express.Router().use(test);
//# sourceMappingURL=index.js.map