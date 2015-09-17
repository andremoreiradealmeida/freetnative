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

var pegaId = "";

var CadastroViewModel = (function (_super) {
    __extends(CadastroViewModel, _super);

    //CONSTRUTOR
    function CadastroViewModel() {
        _super.call(this);
    }

    Object.defineProperty(CadastroViewModel.prototype, "nome", {
        get: function () {
               return this._nome;
        },
        set: function (value) {
            if (this._nome !== value) {
                this._nome = value;                
                this.notifyPropertyChanged("nome", value);
            }

        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CadastroViewModel.prototype, "email", {
        get: function () {
               return this._email;
        },
        set: function (value) {
            if (this._email !== value) {
                this._email = value;                
                this.notifyPropertyChanged("email", value);
            }

        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CadastroViewModel.prototype, "ddd", {
        get: function () {
               return this._ddd;
        },
        set: function (value) {
            if (this._ddd !== value) {
                this._ddd = value;                
                this.notifyPropertyChanged("ddd", value);
            }

        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CadastroViewModel.prototype, "celular", {
        get: function () {
               return this._celular;
        },
        set: function (value) {
            if (this._celular !== value) {
                this._celular = value;                
                this.notifyPropertyChanged("celular", value);
            }

        },
        enumerable: true,
        configurable: true
    });
    
      Object.defineProperty(CadastroViewModel.prototype, "cidade", {
        get: function () {
               return this._cidade;
        },
        set: function (value) {
            if (this._cidade !== value) {
                this._cidade= value;                
                this.notifyPropertyChanged("cidade", value);
            }

        },
        enumerable: true,
        configurable: true
    });
    
     CadastroViewModel.prototype.buscaCidades = function () {
         
        
         
         navigationModule.navigate({
                                      moduleName: viewsModule.Views.cidadepage,
                                      context: {cidade: this._cidade},
                                  });
    };


    CadastroViewModel.prototype.cadastro = function () {                
        
          var erro = this.showError;
          var info = this.showInfo;       
          this._cidade = pegaId;
        
           serviceModule.service.cadastrarUsuario(this._nome, this._email, this._ddd, this._celular, this._cidade).then(function (r) {
                if (r.status) {
                    
                     info(r.mensagem);
                    
                } else {
                     erro(r.mensagem);
                }
            }, function (error) {
                  showError(r.mensagem," verifique sua conexão!")
            });
  };
    

    return CadastroViewModel;

})(viewModelBaseModule.ViewModelBase);
exports.CadastroViewModel = CadastroViewModel;
