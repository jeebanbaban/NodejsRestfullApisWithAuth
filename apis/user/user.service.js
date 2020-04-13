const pool = require("../../config/database")

module.exports = {
    create: (data, callback) =>{
        pool.query(
            `insert into user(name,email,mobile,password) values(?,?,?,?)`,
            [data.name,data.email,data.mobile,data.password],
            (error,results,fields)=>{
                if(error){
                    return callback(error)
                }
                    return callback(null,data)
            }
        )
    },

    getUsers: (callback)=>{
        pool.query(
            `select id,name,email,mobile from user`,
            [],
            (error,results)=>{
                if(error){
                    return callback(error)
                }
                return callback(null,results)
            }
        )
    },

    getUserById: (id,callback)=>{
        pool.query(
            `select id,name,email,mobile from user where id = ?`,
            [id],
            (error,results)=>{
                if(error){
                    return callback(error)
                }
                return callback(null,results[0])

            }
        )
    },

    updateUser: (id,data,callback)=>{
        pool.query(
            `update user set name=?,email=?,mobile=?,password=? where id = ?`,
            [data.name,data.email,data.mobile,data.password,id],
            (error,results)=>{
                if(error){
                    return callback(error)
                }
                return callback(null,data)
            }
        )
    },

    deleteUser: (id,callback)=>{
        pool.query(
            `delete from user where id = ?`,
            [id],
            (error,results)=>{
                if(error){
                    return callback(error)
                }
                return callback(null,results[0])
            }
        )
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from user where email = ?`,
          [email],
          (error, results) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      }
}