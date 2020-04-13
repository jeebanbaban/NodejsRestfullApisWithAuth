require("dotenv").config()
const { create,getUsers,getUserById,updateUser,deleteUser,getUserByUserEmail} = require("./user.service")
const {hashSync,genSaltSync,compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body,(error,results)=>{
            if(error){
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: "Database connection error!"
                })
            }else{
                res.status(200).json({
                    success: true,
                    message: "User created successfully",
                    data: results
                })
            }
        })
    },

    getAllUsers: (req,res)=>{
        const body = req.body
        getUsers((error,results)=>{
            if(error){
                return res.json({
                    success: false,
                    message: "Failed to fetch users!",
                })
            }else{
                return res.json({
                    success: true,
                    message: "Users fetched successfully",
                    data: results
                })
            }
        })
    },

    getSingleUser: (req,res)=>{
        const id = req.params.id
        getUserById(id,(error,results)=>{
            if(error){
                return res.json({
                    success: false,
                    message: "Failed to fetch user!",
                })
            }
            if (!results) {
                return res.json({
                  success: false,
                  message: "User not Found"
                });
              }
            return res.json({
                success: true,
                message: "User data fetched",
                data: results
            })
            
        })
    },

    updateSingleUser: (req,res)=>{
        const body = req.body
        const id = req.params.id
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(id,body,(error,results)=>{
            if(error){
                return res.json({
                    success: false,
                    message: "Failed to update user!",
                })
            }
                return res.json({
                    success: true,
                    message: "User updated successfully",
                    data: results
                })
            
        })
    },

    deleteSingleUser: (req,res)=>{
        const id = req.params.id
        deleteUser(id,(error,results)=>{
            if(error){
                return res.json({
                    success: false,
                    message: "Failed to delete user!",
                })
            }

            return res.json({
                success: true,
                message: "User deleted successfully",
                data: results
            })
            
        })
    },

    login: (req, res) => {
        const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            return res.json({
                success: false,
                data: "Something goes wrong"
              })
          }
          if (!results) {
            return res.json({
              success: false,
              data: "Invalid email or password!"
            })
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "qwe1234", {
              expiresIn: "1h"
            })
            return res.json({
              success: true,
              message: "login successfully",
              token: jsontoken,
              data: results
            })
          } else {
            return res.json({
              success: false,
              data: "Invalid email or password"
            })
          }
        })
      }
      
}