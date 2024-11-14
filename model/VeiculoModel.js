import { Sequelize } from "sequelize";
import banco from "../banco.js";
export default banco.define("veiculo", {
    idveiculo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datafabricacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    anomodelo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valorfipe: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    automatico: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    arcondicionado: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    unicodono: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    sinistros: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});