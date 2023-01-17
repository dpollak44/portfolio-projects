"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("../models/index.js");
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { id, type } = req.body;
    try {
        if (type === 'Provider') {
            const provider = yield index_js_1.Provider.findOne({
                where: {
                    id: +id
                }
            });
            console.log(provider);
            if (provider) {
                req.session.provider = provider;
                res.status(200).send({ message: 'Provider logged in successfully', status: 'success' });
            }
            else {
                res.status(404).send({ message: 'Provider not found', status: 'fail' });
            }
        }
        else if (type === 'Patient') {
            const patient = yield index_js_1.Patient.findOne({
                where: {
                    id: +id
                }
            });
            if (patient) {
                console.log(patient);
                req.session.patient = patient;
                console.log(req.session);
                res.status(200).send({ message: 'Patient logged in successfully', status: 'success' });
            }
            else {
                res.status(404).send({ message: 'Patient not found', status: 'fail' });
                ;
            }
        }
        else {
            res.status(400).send({ message: 'Invalid type', status: 'fail' });
        }
    }
    catch (err) {
        res
            .status(500)
            .send({ message: "Internal server error", error: err });
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.body;
    try {
        if (type === 'Provider') {
            req.session.provider = undefined;
            res.status(200).send({ message: 'Provider logged out successfully', status: 'success' });
        }
        else if (type === 'Patient') {
            req.session.patient = undefined;
            res.status(200).send({ message: 'Patient logged out successfully', status: 'success' });
        }
        else {
            res.status(400).send({ message: 'Invalid type', status: 'fail' });
        }
    }
    catch (err) {
        res
            .status(500)
            .send({ message: "Internal server error", error: err });
    }
}));
exports.default = router;
//# sourceMappingURL=login.js.map