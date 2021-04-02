const server = require('./server.js');
var db = server.getDB();
var loggedInCustomer;
var loggedInStaff;

var userManagement = {
    // newUser是一个传进来的json数据
    addUser: (newUser) => {
        return new Promise((resolve, reject) => {
            // 调用addUser函数
            db.addUser(
                newUser.name,
                newUser.nric,
                newUser.password,
                newUser.phone,
                newUser.email,
                newUser.address,
                newUser.income,
                newUser.balance,
                newUser.type)
                // 处理从datastorage.js的addEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        if(data.type == "Customer") {
                            loggedInCustomer = data;
                        }
                        else {
                            loggedInStaff = data;
                        }
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的addEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    searchUser: (userinfo) => {
        return new Promise((resolve, reject) => {
            // 调用searchUser函数
            db.searchUser(userinfo)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        if(data.type == "Customer") {
                            loggedInCustomer = data;
                        }
                        else {
                            loggedInStaff = data;
                        }
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getUserById: (userId) => {
        return new Promise((resolve, reject) => {
            // 调用getUserById函数
            db.getUserById(userId)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        if(data.type == "Customer") {
                            loggedInCustomer = data;
                        }
                        else {
                            loggedInStaff = data;
                        }
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    userUpdate: (data) => {
        return new Promise((resolve, reject) => {
            // 调用userUpdate函数
            db.userUpdate(data)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        if(data.type == "Customer") {
                            loggedInCustomer = data;
                        }
                        else {
                            loggedInStaff = data;
                        }
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    userPassword: (data) => {
        return new Promise((resolve, reject) => {
            // 调用userPassword函数
            db.userPassword(data)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        if(data.type == "Customer") {
                            loggedInCustomer = data;
                        }
                        else {
                            loggedInStaff = data;
                        }
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    donate: (data) => {
        return new Promise((resolve, reject) => {
            // 调用userPassword函数
            db.donate(data)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    adopte: (data) => {
        return new Promise((resolve, reject) => {
            // 调用userPassword函数
            db.adopte(data)
                // 处理从datastorage.js的getEvent返回的Promise的解析函数。
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                // 处理从datastorage.js的getEvent返回的Promise的拒绝函数。
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getLoggedInCustomer:()=>{
        return loggedInCustomer;
    },
    getLoggedInStaff:()=>{
        return loggedInStaff;
    },
    logout: ()=>{
        loggedInCustomer = undefined;
        loggedInStaff = undefined;
    },
    isCustomerLoggedIn: ()=>{
        return loggedInCustomer != undefined;
    },
    isStaffLoggedIn: ()=>{
        return loggedInStaff != undefined;
    }
};

module.exports = userManagement;