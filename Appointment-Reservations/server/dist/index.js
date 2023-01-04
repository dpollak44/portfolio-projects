"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const express_session_1 = __importDefault(require("express-session"));
app.use((0, express_session_1.default)({
    secret: 'mySecret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false
}));
app.use((0, cors_1.default)({ credentials: true, origin: 'http://localhost:3002' }));
const { PORT } = process.env;
const providers_1 = __importDefault(require("./routes/providers"));
const patients_1 = __importDefault(require("./routes/patients"));
const appointments_1 = __importDefault(require("./routes/appointments"));
const login_1 = __importDefault(require("./routes/login"));
app.use('/providers', providers_1.default);
app.use('/patients', patients_1.default);
app.use('/appointments', appointments_1.default);
app.use('/login', login_1.default);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map