'use strict';

const { registerUser, getAllUser, getUserById, editUserById, deleteUserById } = require('../model/userModel');

module.exports = {
    registerUser: (req, res) => {
        registerUser(req.body,function (error) {
            if(true === error) {
                return res.status(200).json({
                    success: false,
                    message: 'Something went wrong.',
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'User regitser successfully.'
                });
            }
        })
    },
    getAllUsers: (req, res) => {
        getAllUser(function(error, userData) {
            if(true === error) {
                return res.status(200).json({
                    success: false,
                    message: 'Something went wrong.',
                    data: []
                });
            } else {
                userData.forEach((user) => 
                { 
                    delete user.password 
                });
                return res.status(200).json({
                    success: true,
                    message: 'User fetch successfully.',
                    data: userData
                });
            }
        })
    },
    getUserById: async (req, res) => {
        try {
            const userData = await getUserById(req.params.id);
            delete userData.password
            return res.status(200).json({
                success: false,
                message: 'User details fetch successfully.',
                data: userData
            });
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: error.message,
                data: []
            });
        }
    },
    editUser: (req, res) => {
        editUserById(req.params.id, req.body, function(error, userDetail){
            if(true === error) {
                return res.status(200).json({
                    success: false,
                    message: "Something went wrong while updating user.",
                    data: []
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'User updated successfully.',
                    data: userDetail
                });
            }
        });
    },
    deleteUser: async(req, res) => {
        try {
            const userData = await deleteUserById(req.params.id);
            return res.status(200).json({
                success: false,
                message: 'User deleted successfully.',
                data: userData
            });
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: error.message,
                data: []
            });
        }
    },
}