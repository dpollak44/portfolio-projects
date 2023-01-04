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
const moment_1 = __importDefault(require("moment"));
const router = express_1.default.Router();
const index_js_1 = require("../models/index.js");
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        yield index_js_1.Provider.create({
            id: +id,
            name: name
        });
        res.status(200).send({ message: 'Provider created successfully' });
    }
    catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({ message: 'Provider already exists' });
        }
        else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}));
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providers = yield index_js_1.Provider.findAll();
        res.status(200).send(providers);
    }
    catch (err) {
        res
            .status(500)
            .send({ message: 'Error getting providers', error: err });
    }
}));
router.post('/add-availability', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.body', req.body);
    const { provider } = req.session;
    const { date, start_time, end_time } = req.body;
    const dateOnly = (0, moment_1.default)(date).format('YYYY-MM-DD');
    try {
        yield index_js_1.ProviderAvailability.create({
            provider_id: +provider.id,
            date: dateOnly,
            start_time: start_time,
            end_time: end_time
        });
        res.status(200).send({ message: 'Provider availability set successfully' });
    }
    catch (err) {
        console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).send({ message: 'Provider availability already exists' });
        }
        else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}));
router.get('/available-dates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { provider_id } = req.query;
    if (!provider_id) {
        res.status(400).send({ message: 'Missing provider_id' });
    }
    try {
        const providerAvailability = yield index_js_1.ProviderAvailability.findAll({
            where: {
                provider_id: +provider_id
            },
            // distinct: true,
        });
        const providerDates = providerAvailability.map((availability) => {
            return (0, moment_1.default)(availability.date).format('YYYY-MM-DD');
        });
        res.status(200).send(providerDates);
    }
    catch (err) {
        res
            .status(500)
            .send({ message: 'Error getting provider availability', error: err });
    }
}));
router.get('/available-times', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { provider_id, date } = req.query;
    if (!provider_id || !date) {
        res.status(400).send({ message: 'Missing provider_id or date' });
    }
    const availableTimes = [];
    try {
        const providerAvailability = yield index_js_1.ProviderAvailability.findAll({
            where: {
                provider_id: +provider_id,
                date: date
            }
        });
        const patientAppointments = yield index_js_1.PatientAppointment.findAll({
            where: {
                provider_id: +provider_id,
                date: date
            }
        });
        const bookedStartTimes = patientAppointments.map((availability) => {
            return (0, moment_1.default)(availability.time, 'HH:mm');
        });
        for (let i of providerAvailability) {
            let date = (0, moment_1.default)(i.date, 'YYYY-MM-DD');
            let startTime = (0, moment_1.default)(i.start_time, 'HH:mm');
            const endTime = (0, moment_1.default)(i.end_time, 'HH:mm');
            while (startTime < endTime) {
                // eslint-disable-next-line no-loop-func
                const isBooked = bookedStartTimes.some((bookedTime) => {
                    return bookedTime.isSame(startTime);
                });
                const dateTime = (0, moment_1.default)(date).add(startTime.hour(), 'hours').add(startTime.minute(), 'minutes');
                const hoursDiff = (0, moment_1.default)().diff(dateTime, 'hours');
                if (!isBooked && hoursDiff < -24) {
                    availableTimes.push((0, moment_1.default)(startTime).format('HH:mm'));
                }
                startTime = startTime.add(15, 'minutes');
            }
        }
        res.status(200).send(availableTimes);
    }
    catch (err) {
        res
            .status(500)
            .send({ message: 'Error getting provider availability', error: err });
    }
}));
exports.default = router;
//# sourceMappingURL=providers.js.map