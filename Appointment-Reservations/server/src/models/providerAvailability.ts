import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "provider_availability"
})

export class ProviderAvailability extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true
    })
    provider_id!: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        primaryKey: true
    })
    date!: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
        primaryKey: true
    })
    start_time!: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    end_time!: string;
}
