const bodyParser = require('body-parser');
const server = require('./server.js');
const fileUpload = require('express-fileupload');
const request = require('request');
const querystring = require('querystring');

const userManagement = require('./userManagement.js');
const animalManagement = require('./animalManagement.js');
const plantManagement = require('./plantManagement.js');
const roomManagement = require('./roomManagement.js');

const ipAddress = require('./ipAddress.js');
const flag = require('./flag.js');

routes = function () {
    var externalRoutes = require('express').Router();
    var io = server.getSocketIO();

    externalRoutes.use(bodyParser.urlencoded({
        extended: true
    }));

    externalRoutes.use(fileUpload());
    
    //================= Resource file ==================//

    externalRoutes.get('/css/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/js/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });

    externalRoutes.get('/images/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });
    
    externalRoutes.get('/others/*', (req, res) => {
        res.sendFile(req.originalUrl, {
            'root': './'
        });
    });
    
    //===================== Views =====================//

    externalRoutes.get('/', (req, res) => {
        res.sendFile("/views/login.html", {
            'root': './'
        });
    });

    externalRoutes.get('/index', (req, res) => {
        console.log();
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/index.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/index/:biology', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            const query = querystring.stringify({
                "biology": biology,
            });
            res.redirect('/index?' + query);
        }
    });

    externalRoutes.get('/room', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/room.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/room/:action', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var action = req.params.action;
            const query = querystring.stringify({
                "action": action,
            });
            res.redirect('/room?' + query);
        }
    });

    externalRoutes.get('/searchwiki', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/searchwiki.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/searchwiki/:biology/:id/:variety', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            var variety = req.params.variety;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id,
                "variety": variety,
            });
            res.redirect('/searchwiki?' + query);
        }
    });

    externalRoutes.get('/register', (req, res) => {
        res.sendFile("/views/register.html", {
            'root': './'
        });
    });

    externalRoutes.get('/userProfile', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/userProfile.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemCheck', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemCheck.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemCheck/:biology/:id', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id
            });
            res.redirect('/itemCheck?' + query);
        }
    });

    externalRoutes.get('/itemAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemAdd.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemAdd/:biology', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology
            });
            res.redirect('/itemAdd?' + query);
        }
    });

    externalRoutes.get('/itemUpdate', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/itemUpdate.html", {
                'root': './'
            });
        }
    });

    externalRoutes.get('/itemUpdate/:biology/:id', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var biology = req.params.biology;
            var id = req.params.id;
            const querystring = require('querystring');
            const query = querystring.stringify({
                "biology": biology,
                "id": id
            });
            res.redirect('/itemUpdate?' + query);
        }
    });

    externalRoutes.get('/userPassword', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            res.sendFile("/views/userPassword.html", {
                'root': './'
            });
        }
    });

    // ======================= User Action =======================//
    
    externalRoutes.post('/register', (req, res) => {
        var data = req.body;
        userManagement.addUser(data)
            .then(
                (data) => {
                    res.status(200).send(data);
                })
            .catch(
                (err) => {
                    res.status(500).send(err);
                }
            );
    });

    externalRoutes.post('/login', (req, res) => {
        var data = req.body;
        userManagement.searchUser(data)
            .then(
                (data) => {
                    res.status(200).send(data);
                })
            .catch(
                (err) => {
                    res.status(500).send(err);
                }
            );
    });

    externalRoutes.post('/getUserById', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var userId = req.body.userId;
            userManagement.getUserById(userId)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/userUpdate', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.userUpdate(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/userPassword', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.userPassword(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/donate', (req, res) => {
        if (!userManagement.isCustomerLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.donate(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/adopte', (req, res) => {
        if (!userManagement.isCustomerLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            userManagement.adopte(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/logout', (req, res) => {
        userManagement.logout();
        res.status(200).redirect('/');
    });
    
    // ======================= Animal Action =======================//

    externalRoutes.post('/getAllAnimals', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            animalManagement.getAllAnimals()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );     
        }
    });

    externalRoutes.post('/getAnimalById', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var animalId = req.body.animalId;
            animalManagement.getAnimalById(animalId)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalInfoAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
        var data = req.body;
            animalManagement.animalInfoAdd(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageInfoAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            animalManagement.animalImageInfoAdd(id)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.animalImage;
                var filename = req.body.animalId;

                file.mv("./images/animal/" + filename + ".jpg", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).redirect('/index/animal');
                    }
                });
            }
        }
    });

    externalRoutes.post('/animalSearch', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var searchTxt = req.body.name;
            animalManagement.animalSearch(searchTxt)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalInfoUpdate', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalInfoUpdate(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalImageUpdate', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.animalImage;
                var filename = req.body.animalId;
                if (typeof (file) != "undefined") {
                    file.mv("./images/animal/" + filename + ".jpg", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).redirect('/itemUpdate/animal/' + filename);
                        }
                    });
                } else {
                    res.status(200).redirect('/itemUpdate/animal/' + filename);
                }
            }
        }
    });

    externalRoutes.post('/animalDelete', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            const fs = require('fs');

            try {
                fs.unlinkSync("./images/animal/" + id + ".jpg");
                animalManagement.animalDelete(id)
                    .then(
                        (data) => {
                            roomManagement.roomStatusToAvailable(data.roomNumber)
                                .then(
                                    (data) => {
                                        res.status(200).redirect('/index/animal');
                                    })
                                .catch(
                                    (err) => {
                                        res.status(500).send(err);
                                    }
                                );
                        })
                    .catch(
                        (err) => {
                            res.status(500).send(err);
                        }
                    );
            } catch (err) {
                console.log(err);
                res.status(200).redirect('/index');
            }
        }
    });

    externalRoutes.post('/animalAdopte', (req, res) => {
        if (!userManagement.isCustomerLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalAdopte(data)
                .then(
                    (data) => {
                        res.status(200).redirect('/index/animal');
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/animalCommentAdd', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            animalManagement.animalCommentAdd(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    // ======================= Plant Action =======================//

    externalRoutes.post('/getAllPlants', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            plantManagement.getAllPlants()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getPlantById', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var plantId = req.body.plantId;
            plantManagement.getPlantById(plantId)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantInfoAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantInfoAdd(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageInfoAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            plantManagement.plantImageInfoAdd(id)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.plantImage;
                var filename = req.body.plantId;

                file.mv("./images/plant/" + filename + ".jpg", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).redirect('/index/plant');
                    }
                });
            }
        }
    });

    externalRoutes.post('/plantSearch', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var searchTxt = req.body.name;
            plantManagement.plantSearch(searchTxt)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantInfoUpdate', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantInfoUpdate(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantImageUpdate', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            if (req.files) {
                var file = req.files.plantImage;
                var filename = req.body.plantId;

                if (typeof (file) != "undefined") {
                    file.mv("./images/plant/" + filename + ".jpg", function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).redirect('/itemUpdate/plant/' + filename);
                        }
                    });
                } else {
                    res.status(200).redirect('/itemUpdate/plant/' + filename);
                }
            }
        }
    });

    externalRoutes.post('/plantDelete', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var id = req.body.id;
            const fs = require('fs');

            try {
                fs.unlinkSync("./images/plant/" + id + ".jpg");
                plantManagement.plantDelete(id)
                    .then(
                        (data) => {
                            roomManagement.roomStatusToAvailable(data.roomNumber)
                                .then(
                                    (data) => {
                                        res.status(200).redirect('/index/plant');
                                    })
                                .catch(
                                    (err) => {
                                        res.status(500).send(err);
                                    }
                                );
                        })
                    .catch(
                        (err) => {
                            res.status(500).send(err);
                        }
                    );
            } catch (err) {
                console.log(err);
                res.status(200).redirect('/index');
            }
        }
    });

    externalRoutes.post('/plantAdopte', (req, res) => {
        if (!userManagement.isCustomerLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantAdopte(data)
                .then(
                    (data) => {
                        res.status(200).redirect('/index/plant');
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/plantCommentAdd', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            plantManagement.plantCommentAdd(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    // ======================= Room Action =======================//

    externalRoutes.post('/getAllRooms', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAllRooms()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAvailableRooms', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAvailableRooms()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getAnimalAvailableRooms', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getAnimalAvailableRooms()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/getPlantAvailableRooms', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            roomManagement.getPlantAvailableRooms()
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    externalRoutes.post('/getRoomByRoomNumber', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.getRoomByRoomNumber(roomNumber)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomInfoAdd', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            roomManagement.roomInfoAdd(data)
                .then(
                    (data) => {

                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomStatusToOccupied', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.roomStatusToOccupied(roomNumber)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomStatusToAvailable', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.roomNumber;
            roomManagement.roomStatusToAvailable(roomNumber)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });

    externalRoutes.post('/roomDelete', (req, res) => {
        if (!userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var roomNumber = req.body.getRoomNumber;
            console.log(roomNumber);
            roomManagement.roomDelete(roomNumber)
                .then(
                    (data) => {
                        res.status(200).redirect('/room/deleteRoom');
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    externalRoutes.post('/roomCurrentLocation', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            var data = req.body;
            roomManagement.roomCurrentLocation(data)
                .then(
                    (data) => {
                        res.status(200).send(data);
                    })
                .catch(
                    (err) => {
                        res.status(500).send(err);
                    }
                );
        }
    });
    
    // ======================= Whac-A-Mole =======================//
    
    externalRoutes.post('/setServo1Up', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole1_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo1Down', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole1_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo2Up', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole2_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo2Down', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole2_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo3Up', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole3_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo3Down', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole3_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo4Up', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole4_up/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    externalRoutes.post('/setServo4Down', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getWhacAMoleIPAddress()+"/arduino/analog/WAMole4_down/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("status") != -1) {
                        var body = JSON.parse(body);
                        res.status(200).send(body.status);
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });

    // 获取实时温度和湿度记录
    externalRoutes.post('/getRealTimeTemperatureAndHumidity', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'  
            });
        } else {
            var roomNumber = req.body.roomNumber;
            // get Temperature and Humidity (/0必须存在)
            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/analog/temperature_humidity/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("temperature") != -1 && body.indexOf("humidity") != -1) {
                        var data = JSON.parse(body);
                        res.status(200).send(data);
                        if(data.temperature > 30){
                            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/fan_on/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                flag.setTempFlag(true);
                                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led1/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    flag.setLed1Flag(true);
                                } else {
                                    console.log(err);
                                }
                                });
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.temperature < 20) {
                            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                flag.setLed1Flag(true);
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.humidity < 30) {
                            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                               flag.setLed1Flag(true);
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else if(data.humidity > 70) {
                            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led1/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                flag.setLed1Flag(true);
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else {
                            flag.setLed1Flag(false);
                            if(flag.getH2SFlag() == false && flag.getTempFlag() == false) {
                                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/fan_off/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {

                                } else {
                                    console.log(err);
                                }
                                });
                            }
                        }
                    }
                } else {
                    console.log(err);
                }
            });
        }
    });
    
    // 实时获取H2S记录
    externalRoutes.post('/getRealTimeH2S', (req, res) => {
        if (!userManagement.isCustomerLoggedIn() && !userManagement.isStaffLoggedIn()) {
            res.status(401).sendFile("/views/401Page.html", {
                'root': './'
            });
        } else {
            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/analog/h2s/0", function (err, respone, body) {
                if (!err && respone.statusCode == 200) {
                    if(body.indexOf("h2s") != -1) {
                        var data = JSON.parse(body);
                        res.status(200).send(data);
                        if(data.h2s > 120){
                            request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/fan_on/0", function (err, respone, body) {
                            if (!err && respone.statusCode == 200) {
                                flag.setH2SFlag(true);
                                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/led3/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {
                                    flag.setLed1Flag(true);
                                } else {
                                    console.log(err);
                                }
                                });
                            } else {
                                console.log(err);
                            }
                            });
                        }
                        else {
                            flag.setH2SFlag(false);
                            if(flag.getH2SFlag() == false && flag.getTempFlag() == false) {
                                request.get("http://"+ipAddress.getTemperatureHumidityLedH2SIPAddress()+"/arduino/digital/fan_off/0", function (err, respone, body) {
                                if (!err && respone.statusCode == 200) {

                                } else {
                                    console.log(err);
                                }
                                });
                            }
                        }
                    }

                } else {
                    console.log(err);
                }
            });
        }
    });
    
    return externalRoutes;
};

module.exports = routes();