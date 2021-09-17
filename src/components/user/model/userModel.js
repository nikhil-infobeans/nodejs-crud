'use strict';

const pool = require('../../../../config/db-connect');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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
    loginUser: async (userData) => {
        let username = userData.email;
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT firstname, lastname, email, password, mobile_number from users where email = ?`,[username], function(error, results) {
                    if(error) {
                        return reject(new Error('Invalid credentials'));
                    } else {
                        if(results.length === 0) {
                            return reject(new Error("Invalid credentials."));
                        } else {
                            //Match password
                            let userPassword = results[0].password;
                            let userDetails = results[0];
                            bcrypt.compare(userData.password, userPassword, (err, data) => {
                                //if error than throw error
                                if (err) {
                                    return reject(new Error("Invalid credentials."));
                                }
                                //if both match than you can do anything
                                if (data) {
                                    // Create token
                                    const token = jwt.sign({
                                        email: userDetails.email,
                                        firstname: userDetails.firstname,
                                        lastname: userDetails.lastname
                                    }, process.env.TOKEN_KEY,
                                        {
                                        expiresIn: "2h",
                                        }
                                    );
                                    return resolve(token);
                                } else {
                                    return reject(new Error("Invalid credentials."));
                                }
                            })
                        }
                    }
                }
            )
        });
    },
}
