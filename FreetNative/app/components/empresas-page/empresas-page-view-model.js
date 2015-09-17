var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};


var viewModelBaseModule = require("../common/view-model-base");
var notificationsModule = require("../../utils/notifications");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var viewsModule = require("../../utils/views");
var constantsModule = require("../../utils/constants");
var observable = require("data/observable");
var observableArray = require("data/observable-array");

var EmpresasPageViewModel = (function (_super) {
    __extends(EmpresasPageViewModel, _super);

    //CONSTRUTOR
    function EmpresasPageViewModel() {
        _super.call(this);
        this.carregaInicio();
    }

    Object.defineProperty(EmpresasPageViewModel.prototype, "itemsEmpresas", {
          get: function () {
              if (this._itemsEmpresas != null) {
                  return this._itemsEmpresas;
              }
              else {
                  this._itemsEmpresas = new observableArray.ObservableArray();
                  return this._itemsEmpresas;
              }
          },
          enumerable: true,
          configurable: true
      });

    
    EmpresasPageViewModel.prototype.carregaInicio = function () {    
    
        var objItem;
        var _this = this;

        _this.beginLoading();
        
        serviceModule.service.getEmpresas().then(function (empresaslist) {
            
            for (var i = 0; i < empresaslist.length; i++) {
                
                if (empresaslist[i].visivelApp !== "0") {
                    objItem = new observable.Observable();
                    objItem.set("id", empresaslist[i].id);
                    objItem.set("thumb", _this.buscaImagemCached(empresaslist[i].logoEmpresa));
                    objItem.set("nome", empresaslist[i].nome);
                    objItem.set("campanhas", empresaslist[i].campanhas);

                    _this.itemsEmpresas.push(objItem);
                }
                
                _this.endLoading();
            }
            
            
        }, function (error) {
            _this.endLoading();
        });

    };
    
    EmpresasPageViewModel.prototype.getTicketsEmpresa = function (item) {
        
        console.log(item.id);
        
        var listaTicketsEmpresa;
        var objItem;
        var _this = this;

        _this.beginLoading();
        
        serviceModule.service.getTicketsEmpresas(item.id).then(function (ticketsempresalist) {
            
            listaTicketsEmpresa = new observableArray.ObservableArray();
            
            for (var i = 0; i < ticketsempresalist.length; i++) {
                
                objItem = new observable.Observable();
                objItem.set("id", ticketsempresalist[i].id);
                //objItem.set("thumb", _this.buscaImagemCached(ticketsempresalist[i].logoEmpresa));

                listaTicketsEmpresa.push(objItem);
                
                
                _this.endLoading();
            }
            
            navigationModule.navigate({moduleName: viewsModule.Views.ticketsempresa,context: listaTicketsEmpresa});    
            
        }, function (error) {
            _this.endLoading();
        });

    };
    
    EmpresasPageViewModel.prototype.voltar = function () {    

        navigationModule.goBack();
        
    };
    
    return EmpresasPageViewModel;

})(viewModelBaseModule.ViewModelBase);
exports.EmpresasPageViewModel = EmpresasPageViewModel;
