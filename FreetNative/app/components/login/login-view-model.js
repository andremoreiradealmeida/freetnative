var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


var viewModelBaseModule = require("../common/view-model-base");
var constantsModule = require("../../utils/constants");
var serviceModule = require("../../utils/service");
var navigationModule = require("../../utils/navigation");
var viewsModule = require("../../utils/views");


var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);

    //CONSTRUTOR
    function LoginViewModel() {
        _super.call(this);
        //this._username = serviceModule.service.getLocalSettings(constantsModule.usr);
        //this._password = serviceModule.service.getLocalSettings(constantsModule.pwd);      
        
        this._username = "andremoreiradealmeida@gmail.com";
        this._password = "cafe";      
        
    }

    //PROPRIEDADES
    Object.defineProperty(LoginViewModel.prototype, "usuario", {
        get: function () {
            return this._usuario;
        },
        set: function (value) {
            if (this._usuario !== value) {
                this._usuario = value;
                this.notifyPropertyChanged("usuario", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginViewModel.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (value) {
            if (this._username !== value) {
                this._username = value;                
                this.notifyPropertyChanged("username", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginViewModel.prototype, "password", {
        get: function () {
            return this._password;
        },
        set: function (value) {
            if (this._password !== value) {
                this._password = value;
                this.notifyPropertyChanged("password", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    

    //** FREET
    LoginViewModel.prototype.login = function () {

        var _this = this;

        if (_this.validate()) {
            _this.beginLoading(); 
            serviceModule.service.login(_this.username, _this.password).then(function (user) {
                if (user.login == "true") {
                    
                    _this.usuario = user;

                    navigationModule.navigate({
                        moduleName: viewsModule.Views.ticketspage,
                        context: _this
                    });

                    _this.endLoading();

                } else {
                    _this.endLoading();
                    _this.showError("Erro ao efetuar login. Verifique seu email e senha");
                }
            }, function (error) {
                _this.endLoading();
            });
        }
        else {
            _this.clearPassword();
        }
    };

    LoginViewModel.prototype.cadastro = function () {
        navigationModule.navigate(viewsModule.Views.cadastro);
    };
    LoginViewModel.prototype.clearPassword = function () {
        this.password = "";
    };
    LoginViewModel.prototype.validate = function () {
        if (!this.username || this.username === "") {
            this.showError("Please enter username.");
            return false;
        }
        if (!this.password || this.password === "") {
            this.showError("Please enter password.");
            return false;
        }
        return true;
    };

    return LoginViewModel;

})(viewModelBaseModule.ViewModelBase);
exports.LoginViewModel = LoginViewModel;
