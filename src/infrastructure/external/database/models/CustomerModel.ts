import { Table, Column, DataType, Model, HasMany } from "sequelize-typescript";

@Table({
	timestamps: true,
	tableName: "customer",
	modelName: "Customer",
})
export class Customer extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
	cpf: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	phoneNumber: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	email: string;
}
