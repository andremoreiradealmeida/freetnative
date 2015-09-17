var application = require("application");
var viewsModule = require("./utils/views");


global.idUsuario="";
global.idCidade="";

application.onLaunch = function (context) {
    var serviceModule = require("./utils/service");
    if (serviceModule.service.isAuthenthicated) {
        application.mainModule = viewsModule.Views.login;
    }
    else {
        application.mainModule = viewsModule.Views.login;
    }
};


application.start();
