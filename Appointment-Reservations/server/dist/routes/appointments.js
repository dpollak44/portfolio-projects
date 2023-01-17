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
const appointment_1 = require("../modules/appointment");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../models/index");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('hello');
    console.log(req.session.patient);
    const { patient } = req.session;
    console.log(patient);
    try {
        index_1.PatientAppointment.belongsTo(index_1.Provider, { foreignKey: 'provider_id' });
        const patientAppointments = yield index_1.PatientAppointment.findAll({
            where: {
                patient_id: +patient.id
            },
            include: [index_1.Provider]
        });
        console.log(patientAppointments);
        const mappedAppointments = patientAppointments.map((appointment) => {
            const { provider_id, appointment_id, confirmed, time, date, provider } = appointment;
            return {
                provider_id,
                appointment_id,
                confirmed,
                time,
                date,
                provider
            };
        });
        res.status(200).send({ message: 'Appointments fetched successfully', appointments: mappedAppointments });
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .send({ message: 'Error getting patient appointments', error: err });
    }
}));
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patient } = req.session;
        const { provider_id, date, time } = req.body;
        const dateOnly = (0, moment_1.default)(req.body.date).format('YYYY-MM-DD');
        const dateTime = (0, moment_1.default)(`${dateOnly} ${req.body.time}`).format('YYYY-MM-DD HH:mm');
        //check how many hours are left before the appointment
        let hoursDif = (0, moment_1.default)().diff((0, moment_1.default)(dateTime), 'hours');
        //only create appointment if there are more than 24 hours left
        if (hoursDif < -24) {
            const appt_res = yield index_1.PatientAppointment.create({
                patient_id: +patient.id,
                provider_id: +provider_id,
                date: date,
                time: time
            });
            const thirtyMinutes = 30 * 60 * 1000;
            (0, appointment_1.cancelAppointmentIfNotConfirmed)(appt_res.appointment_id, thirtyMinutes);
            res.status(200).send({ message: 'Patient appointment created successfully. ID is ' + appt_res.appointment_id });
        }
        else {
            res.status(200).send({ message: 'Patient appointment cannot be created less than 24 hours in advance.' });
        }
    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .send({ message: 'Error creating patient appointment', error: err });
    }
}));
router.post('/confirm', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { appointment_id } = req.body;
    try {
        const apptConfirmRes = yield index_1.PatientAppointment.update({
            confirmed: true
        }, {
            where: {
                appointment_id: +appointment_id
            }
        });
        if (apptConfirmRes[0] === 1) {
            res.status(200).send({ message: 'Patient appointment confirmed successfully', status: "success" });
        }
        else {
            res.status(400).send({ message: 'Patient appointment not found', status: "not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Unable to confirm appointment', status: "fail" });
    }
}));
exports.default = router;
//# sourceMappingURL=appointments.js.map