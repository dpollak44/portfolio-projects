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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentIfNotConfirmed = void 0;
const index_js_1 = require("../models/index.js");
const asyncTimeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
// This function is called when a patient makes an appointment
// It takes an appointment id and an amount of time to wait before cancelling the appointment if not confirmed
const cancelAppointmentIfNotConfirmed = (appointment_id, ms) => __awaiter(void 0, void 0, void 0, function* () {
    yield asyncTimeout(ms);
    const appointment = yield index_js_1.PatientAppointment.findOne({
        where: {
            appointment_id: appointment_id
        }
    });
    if (appointment) {
        if (!appointment.confirmed) {
            yield index_js_1.PatientAppointment.destroy({
                where: {
                    appointment_id: appointment_id
                }
            });
        }
    }
});
exports.cancelAppointmentIfNotConfirmed = cancelAppointmentIfNotConfirmed;
//# sourceMappingURL=appointment.js.map