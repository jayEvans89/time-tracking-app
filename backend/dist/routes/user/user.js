"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = (app) => {
    app.get('/user', (req, res) => {
        res.send('user route');
    });
};
//# sourceMappingURL=user.js.map