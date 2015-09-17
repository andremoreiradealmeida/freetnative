var applicationSettingsModule = require("application-settings");
var http = require("http");
var constantsModule = require("./constants");
var notificationsModule = require("./notifications");
var everliveModule = require("../lib/everlive");


var TASK = "Task";
var PROJECT = "Project";
var DUE_DATE = "DueDate";
var Service = (function () {
    function Service() {
        
    }
    Object.defineProperty(Service.prototype, "isAuthenticated", {
        get: function () {
            return applicationSettingsModule.hasKey(constantsModule.usrId);
        },
        enumerable: true,
        configurable: true
    });

    Service.prototype.logout = function () {
        this.clearLocalSettings();
        this.clearEverlive();
    };

    Service.prototype.signUp = function (username, password, additionalData) {
        return new Promise(function (resolve, reject) {
            var everlive = new everliveModule(constantsModule.telerikApiKey);
            everlive.Users.register(username, password, additionalData, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.clearEverlive = function () {
        if (this._everlive) {
            //this._everlive.offlineStorage.purgeAll();
            this._everlive = null;
        }
    };
    Service.prototype.getProjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = new everliveModule.Query();
            query.order("Name");
            var everlive = _this.createEverlive();
            everlive.data(PROJECT).get(query).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getProject = function (projectId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(PROJECT).getById(projectId).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getOverdueTasks = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        return this.getTasksBefore(start);
    };
    Service.prototype.getTasksForToday = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 1);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksForTomorrow = function () {
        var now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        start.setDate(start.getDate() + 1);
        var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end.setDate(start.getDate() + 2);
        return this.getTasksBetween(start, end);
    };
    Service.prototype.getTasksAfterTomorrow = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        date.setDate(date.getDate() + 2);
        return this.getTasksAfter(date);
    };
    Service.prototype.getTasksByProject = function (project) {
        var query = new everliveModule.Query();
        query
            .where()
            .eq(PROJECT, project.Id);
        return this.getTasks(query);
    };
    Service.prototype.createTask = function (task) {
        return this.createItem(TASK, task);
    };
    Service.prototype.updateTask = function (task) {
        return this.updateItem(TASK, task);
    };
    Service.prototype.deleteTask = function (task) {
        return this.deleteItem(TASK, task);
    };
    Service.prototype.createProject = function (project) {
        return this.createItem(PROJECT, project);
    };
    Service.prototype.updateProject = function (project) {
        return this.updateItem(PROJECT, project);
    };
    Service.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.currentUser().then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateUser = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.updateSingle(user, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.changeUserPassword = function (username, oldPassword, newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Users.changePassword(username, oldPassword, newPassword, true, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteProject = function (project) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(TASK).destroy({ Project: project.Id }, function (data) {
                _this.deleteItem(PROJECT, project).then(resolve, reject);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.getDownloadUrlFromId = function (fileId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.Files.getDownloadUrlById(fileId).then(function (url) {
                resolve(url);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.uploadPicture = function (picture) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            var file = {
                "Filename": "NativeScriptIsAwesome.jpg",
                "ContentType": "image/jpeg",
                "base64": picture.toBase64String("JPEG", 100)
            };
            everlive.Files.create(file, function (data) {
                resolve(data);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createEverlive = function () {
        if (!this._everlive) {
            this._everlive = new everliveModule({
                apiKey: constantsModule.telerikApiKey,
                token: applicationSettingsModule.getString(constantsModule.authenticationTokenKey)
            });
        }
        return this._everlive;
    };
    Service.showErrorAndReject = function (error, reject) {
        notificationsModule.showError(error.message);
        reject(error);
    };
    Service.prototype.getTasksBetween = function (start, end) {
        var query = new everliveModule.Query();
        query
            .where()
            .and()
            .gte(DUE_DATE, start)
            .lt(DUE_DATE, end)
            .done();
        return this.getTasks(query);
    };
    Service.prototype.getTasksBefore = function (date) {
        var query = new everliveModule.Query();
        query
            .where()
            .lt(DUE_DATE, date);
        return this.getTasks(query);
    };
    Service.prototype.getTasksAfter = function (date) {
        var query = new everliveModule.Query();
        query
            .where()
            .or()
            .gte(DUE_DATE, date)
            .eq(DUE_DATE, null)
            .done();
        return this.getTasks(query);
    };
    Service.prototype.getTasks = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            query.order("Name");
            var everlive = _this.createEverlive();
            everlive.data(TASK).get(query).then(function (data) {
                resolve(data.result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.createItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).create(item, function (result) {
                resolve(result);
            }, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.updateItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).updateSingle(item, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };
    Service.prototype.deleteItem = function (dataName, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var everlive = _this.createEverlive();
            everlive.data(dataName).destroySingle({ Id: item.Id }, resolve, function (error) {
                Service.showErrorAndReject(error, reject);
            });
        });
    };


    //FREET
    Service.prototype.login = function (username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.login + "?usuario=" + username + "&senha=" + password).then(function (r) {
                resolve(r);

                console.log("### LOGIN");
                console.log(JSON.stringify(r));   
                
                
                
                _this.setLocalSettings(constantsModule.usr, username);
                _this.setLocalSettings(constantsModule.pwd, password);
                
                    //salva id na global para utilizacao futura nas requisicoes 
                global.idUsuario= r.id;
                global.idCidade= r.cidade;
                
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    Service.prototype.getGetTickets = function (idUsuario, idCidadeUsuario) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.appGetTickets + "?idUsuario=" + idUsuario + "&idCidade=" + idCidadeUsuario).then(function (r) {
                resolve(r);
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    Service.prototype.getEmpresas = function () {
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.appGetEmpresasComEventos).then(function (r) {
                resolve(r);
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    
    
    Service.prototype.getTicketsEmpresas = function (idEmpresa) {
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.appGetTicketsEmpresas + "?idUsuario=" + global.idUsuario + "&idEmpresa=" + idEmpresa).then(function (r) {
                resolve(r);
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    
    Service.prototype.getMinhaCarteira = function (idUsuario) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.appGetMinhaCarteira + "?idUsuario=" + idUsuario).then(function (r) {
                resolve(r);
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    Service.prototype.resgatarTicket = function (idUsuario, idCampanha) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.appResgatarTicket + "?id=" + idUsuario + "&idEvento=" + idCampanha).then(function (r) {
                resolve(r);
            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    
    Service.prototype.cadastrarUsuario = function (nome,email,ddd,celular,cidade) {

        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.pathFreet + "cadastro.php?nome=" + nome + "&email=" + email + "&ddd=" + ddd + "&celular=" + celular + "&cidade=" + cidade).then(function (r) {
                resolve(r);
                
                console.log("### CADASTRO");
                console.log(JSON.stringify(r));   

            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    
    
    
     Service.prototype.trazCidades = function (cidade) {

        return new Promise(function (resolve, reject) {
            http.getJSON(constantsModule.pathFreet + "web-get-cidades.php?term=" + cidade).then(function (r) {
                resolve(r);
                
                console.log("###CIDADES###");
                console.log(JSON.stringify(r));   

            }, function (e) {
                Service.showErrorAndReject(e, r);
            });
        });
    };
    
    Service.prototype.setLocalSettings = function (item, valor) {
        applicationSettingsModule.setString(item, valor);
    };
    Service.prototype.getLocalSettings = function (item) {
        return applicationSettingsModule.getString(item);
    };
    Service.prototype.clearLocalSettings = function () {
        applicationSettingsModule.remove(constantsModule.authenticationTokenKey);
    };
    return Service;
})();
exports.Service = Service;
exports.service = new Service();
