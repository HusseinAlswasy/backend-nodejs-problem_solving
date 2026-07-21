
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('assignment6', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

export const connectionDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been establish successfuly');
    } catch (error) {
        console.log('Unable to connect to the database : ', error);
    }
}

export const SyncDB = async () => {
    try {
        await sequelize.sync({ alter: false });
        console.log('All models were Sync success');
    } catch (error) {
        console.log('Unable to Sync to the database : ', error);
    }
}
