'use strict';

const pool = require('../../../../config/db-connect');
const bcrypt = require('bcrypt');

module.exports = {
    registerUser: async (userData, response) => {
        let userObj = {
            firstname: userData.first_name,
            lastname: userData.last_name,
            email: userData.email,
            password: userData.password,
            mobile_number: userData.mobile_number,
            created_at: new Date()
        }
        userObj.password = await bcrypt.hash(userObj.password, 8);
        pool.query(
            `INSERT INTO users set ?`, userObj, function(error, result) {
                if(!error) {
                    response(false);
                } else {
                    response(true);
                }
            }
        )   
    },
    checkEmailExist:(email) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT count(*) as count from users where email = ?', [email], function (error, results, fields) {
                if(!error){
                    return resolve(results[0].count > 0);
                } else {
                    return reject(new Error('Database error!!'));
                }
              }
            );
        });
    },
    getAllUser: (response) => {
        pool.query(
            `SELECT * from users`, function(error, results) {
                if(error) {
                    response(true, null);
                } else {
                    response(false, results);
                }
            }
        )   
    },
    getUserById: (userId,response) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT * from users where id = ?`,userId, function(error, results) {
                    if(error) {
                        return reject(new Error('Database error!!'));
                    } else {
                        if(results.length === 0) {
                            return reject(new Error("User doesn't exists."));
                        } else {
                            return resolve(results[0]);
                        }
                    }
                }
            )
        });  
    },
    editUserById: (userId, userData, response) => {
        let userObj = {
            firstname: userData.first_name,
            lastname: userData.last_name,
        }
        if (typeof userData.mobile_number !== undefined) {
            userObj['mobile_number'] = userData.mobile_number;
        }
        const query = "Update users SET " + Object.keys(userObj).map(key => `${key} = ?`).join(", ") + " WHERE id = ?";
        pool.query(
            query,[...Object.values(userObj), userId], function(error, results) {
                if(error) {
                    response(true, null);
                } else {
                    if(results.length === 0) {
                        response(true, null);
                    } else {
                        response(false, results[0]);
                    }
                }
            }
        )
    },
    deleteUserById: (userId,response) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE from users where id = ?`,userId, function(error, results) {
                    console.log(error, '----', results);
                    if(error) {
                        return reject(new Error('Database error!!'));
                    } else {
                        if(results.affectedRows === 0) {
                            return reject(new Error("User doesn't exists."));
                        } else {
                            return resolve(results[0]);
                        }
                    }
                }
            )
        });  
    },
}