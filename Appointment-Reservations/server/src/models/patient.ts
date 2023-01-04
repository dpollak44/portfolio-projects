import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "patient"
})
export class Patient extends Model {
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;
}


