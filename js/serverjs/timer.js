const request = require('request');
const schedule = require('node-schedule');

const roomManagement = require('./roomManagement.js');

const ipAddress = require('./ipAddress.js');
const flag = require('./flag.js');

// 把读取的温度和湿度记录在数据库
var setTimerSetTemperatureHumidityDB = new schedule.RecurrenceRule();
setTimerSetTemperatureHumidityDB.second = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];
schedule.scheduleJob(setTimerSetTemperatureHumidityDB, function () {
    // Add Temperature and Humidity
    request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/analog/temperature_humidity/0", function (err, respone, body) {
        if (!err && respone.statusCode == 200) {
            if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
                var body = JSON.parse(body);
                roomManagement.roomAddTemperatureAndHumidity(body)
                    .then(
                        (data) => {
                            // console.log("add");
                        })
                    .catch(
                        (err) => {
                            console.log(err);
                        }
                    );
            }

        } else {
            console.log(err);
        }
    });
});

// 把数据库的温度和湿度记录清除
var setTimerDeleteTemperatureHumidityDB = new schedule.RecurrenceRule();
setTimerDeleteTemperatureHumidityDB.minute = [0, 10, 20, 30, 40, 50];
schedule.scheduleJob(setTimerDeleteTemperatureHumidityDB, function () {
    // Delete Temperature and Humidity (/0必须存在)
    request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/analog/temperature_humidity/0", function (err, respone, body) {
        if (!err && respone.statusCode == 200) {
            if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
                var body = JSON.parse(body);
                roomManagement.roomDeleteTemperatureAndHumidity(body)
                    .then(
                        (data) => {
                            // console.log("delete");
                        })
                    .catch(
                        (err) => {
                            console.log(err);
                        }
                    );
            }

        } else {
            console.log(err);
        }
    });
});

// 把读取的H2S记录在数据库
var setTimerSetH2SDB = new schedule.RecurrenceRule();
setTimerSetH2SDB.second = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54];
schedule.scheduleJob(setTimerSetH2SDB, function () {
    // Update H2S
    request.get("http://1"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/analog/h2s/0", function (err, respone, body) {
        if (!err && respone.statusCode == 200) {
            if(body.indexOf("h2s") != -1) {
                var body = JSON.parse(body);
                roomManagement.roomUpdateH2S(body)
                    .then(
                        (data) => {
                            // console.log("update");
                        })
                    .catch(
                        (err) => {
                            console.log(err);
                        }
                    );
            }

        } else {
            console.log(err);
        }
    });
});

// 从数据库中读取的H2S记录
var setTimerGetH2SDB = new schedule.RecurrenceRule();
setTimerGetH2SDB.second = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57];
schedule.scheduleJob(setTimerGetH2SDB, function () {
    var roomNumber = 1;
    roomManagement.getRoomByRoomNumber(roomNumber)
        .then(
            (data) => {
                if(data[0].h2s > 120) {
                    console.log("Start");
                    request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox1_on/0", function (err1_on, respone1_on, body1_on) {
                    if (!err1_on && respone1_on.statusCode == 200) {
                        console.log("1_on");
                        setTimeout(function(){
                        request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox2_on/0", function (err2_on, respone2_on, body2_on) {
                        if (!err2_on && respone2_on.statusCode == 200) {
                            console.log("2_on");
                            setTimeout(function(){
                            request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox2_off/0", function (err2_off, respone2_off, body2_off) {
                            if (!err2_off && respone2_off.statusCode == 200) {
                                console.log("2_off");
                                setTimeout(function(){
                                request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox1_off/0", function (err1_off, respone1_off, body1_off) {
                                if (!err1_off && respone1_off.statusCode == 200) {
                                    console.log("1_off");
                                    setTimeout(function(){
                                    request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox3_on/0", function (err3_on, respone3_on, body3_on) {
                                        console.log("311on");
                                    if (!err3_on && respone3_on.statusCode == 200) {
                                        console.log("3_on");
                                        setTimeout(function(){
                                        request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/catlitterbox3_off/0", function (err3_off, respone3_off, body3_off) {
                                        if (!err3_off && respone3_off.statusCode == 200) {
                                            console.log("3_off");
                                            setTimeout(function(){
                                            request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/sprinkler_on/0", function (err4_on, respone4_on, body4_on) {
                                            if (!err4_on && respone4_on.statusCode == 200) {
                                                console.log("sprinkler_on");
                                                setTimeout(function(){
                                                request.get("http://"+ipAddress.getSprinklerCatlitterboxIPAddress+"/arduino/analog/sprinkler_off/0", function (err5_off, respone5_off, body5_off) {
                                                if (!err5_off && respone5_off.statusCode == 200) {
                                                    console.log("sprinkler_catlitterbox");
                                                }
                                                })
                                                },2000);
                                            }
                                            })
                                            },2000);
                                        }
                                        })
                                        },5000);
                                    }
                                    })
                                    },3000);
                                }
                                })
                                },2000);
                            }
                            else {
                                console.log(err);
                            }
                            });
                            },10000);
                        }
                        else {
                            console.log(err);
                        }
                        });
                        },2000);
                    }
                    })
                }
            })
        .catch(
            (err) => {
                console.log(err);
            }
        );
});

// 每天12点和18点读取食物 
var setTimerFood = new schedule.RecurrenceRule();
setTimerFood.second = [0];
schedule.scheduleJob(setTimerFood, function () {
    // 检测食物是否已经吃完
    request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/food_light_sensor/0", function (err, respone, body) {
        if (!err && respone.statusCode == 200) {
            var body = JSON.parse(body);
            console.log(body);
            if(body.food_light_sensor < 300) {
                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led2/0", function (err, respone, body) {
                    if (!err && respone.statusCode == 200) {
                        flag.setLed2Flag(true);
                    } else {
                        console.log(err);
                    }
                });
            }
            else {
                // 开启开关
                request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/food_servo_on/0", function (err, respone, body) {
                    if (!err && respone.statusCode == 200) {
                        var count = 0;
                        var interval = setInterval(function () {
                            // 检测食物是否装满
                            request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/food_light_sensor/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    var body = JSON.parse(body);
                                    if(body.food_light_sensor < 100) {
                                        // 关闭开关
                                        request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/food_servo_off/0", function (err, respone, body) {
                                            if (!err && respone.statusCode == 200) {
                                                console.log(body);
                                                clearInterval(interval);
                                            } else {
                                                console.log(err);
                                            }
                                        });
                                    }
                                    console.log(body);
                                } else {
                                    console.log(err);
                                }
                            });
                            count++;
                            console.log("food_light_sensor " + count);
                            if(count == 30) {
                                clearInterval(interval);
                            }
                        }, 1000);

                    } else {
                        console.log(err);
                    }
                }); 
            }
        } else {
            console.log(err);
        }
    });
});

// 每天12点和18点读取水位
var setTimerWater = new schedule.RecurrenceRule();
setTimerWater.second = [0];
schedule.scheduleJob(setTimerWater, function () {
    // 检测食物是否已经吃完
    request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/water_level_sensor/0", function (err, respone, body) {
        if (!err && respone.statusCode == 200) {
            var body = JSON.parse(body);
            console.log(body);
            if(body.water_level_sensor > 600) {
                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led2/0", function (err, respone, body) {
                    if (!err && respone.statusCode == 200) {
                        flag.setLed2Flag(true);
                    } else {
                        console.log(err);
                    }
                });
            }
            else {
                // 开启开关
                request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/pump_on/0", function (err, respone, body) {
                    if (!err && respone.statusCode == 200) {
                        var count = 0;
                        var interval = setInterval(function () {
                            // 检测食物是否装满
                            request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/water_level_sensor/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    var body = JSON.parse(body);
                                    if(body.water_level_sensor >1000) {
                                        // 关闭开关
                                        request.get("http://"+ipAddress.getFoodWaterIPAddress()+"/arduino/analog/pump_off/0", function (err, respone, body) {
                                            if (!err && respone.statusCode == 200) {
                                                console.log(body);
                                                clearInterval(interval);
                                            } else {
                                                console.log(err);
                                            }
                                        });
                                    }
                                    console.log(body);
                                } else {
                                    console.log(err);
                                }
                            });
                            count++;
                            console.log("water_level_sensor " + count);
                            if(count == 30) {
                                clearInterval(interval);
                            }
                        }, 1000);

                    } else {
                        console.log(err);
                    }
                }); 
            }
        } else {
            console.log(err);
        }
    });
});


// 正常
var setTimerNormal = new schedule.RecurrenceRule();
setTimerNormal.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
schedule.scheduleJob(setTimerNormal, function () {
    if(flag.getLed1Flag() == false && flag.getLed2Flag() == false && flag.getLed3Flag() == false && flag.getLed4Flag() == false && flag.getLed5Flag() == false) {
        request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led6/0", function (err, respone, body) {
            if (!err && respone.statusCode == 200) {

            } else {
                console.log(err);
            }
        });
    }
});