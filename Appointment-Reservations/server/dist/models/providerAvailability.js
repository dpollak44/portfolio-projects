"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderAvailability = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let ProviderAvailability = class ProviderAvailability extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BIGINT,
        allowNull: false,
        primaryKey: true
    })
], ProviderAvailability.prototype, "provider_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false,
        primaryKey: true
    })
], ProviderAvailability.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
        primaryKey: true
    })
], ProviderAvailability.prototype, "start_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
    })
], ProviderAvailability.prototype, "end_time", void 0);
ProviderAvailability = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "provider_availability"
    })
], ProviderAvailability);
exports.ProviderAvailability = ProviderAvailability;
//# sourceMappingURL=providerAvailability.js.map