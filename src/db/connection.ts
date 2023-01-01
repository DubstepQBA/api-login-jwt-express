import {Sequelize} from "sequelize";

const sequelize = new Sequelize('api','root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;