import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "patient_appointment"
})
export class PatientAppointment extends Model {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataType.UUIDV4
    })
    appointment_id!: number;
    @Column({
            type: DataType.BIGINT,
            allowNull: false,
    })
    patient_id!: number;

    @Column({
            type: DataType.BIGINT,
            allowNull: false,
    })
    provider_id!: string;
    
    @Column({
            type: DataType.DATE,
            allowNull: false,
    })
    date!: string;

    @Column({
            type: DataType.TIME,
            allowNull: false,
    })
    time!: string;

    @Column({
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
    })
    confirmed!: boolean;
    provider: any;
}