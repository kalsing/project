import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

export default sequelize;




























/*const sqlite3 = require('sqlite3').verbose()
const dbName = 'UsersDB'

let db = new sqlite3.Database(dbName, (err) => {
    if(err){
        console.log(err.message)
    }
    else{
        console.log("Connceted") 
        db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,', (err) => {})}
        if(err){
            console.error(err.message)
        }else{
            console.log("Table created")
        }
})

module.exports = db;*/