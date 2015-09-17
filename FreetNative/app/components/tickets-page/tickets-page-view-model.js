var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() {
        this.constructor = d;
    }
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




var TicketsPageViewModel = (function (_super) {
    __extends(TicketsPageViewModel, _super);

    function TicketsPageViewModel() {
        _super.call(this);
        
        //carrega dados iniciais
        this.carregaInicio(global.idUsuario, global.idCidade);
    }

    Object.defineProperty(TicketsPageViewModel.prototype, "itemsTickets", {
                              get: function () {
                                  if (this._itemsTickets != null) {
                                      return this._itemsTickets;
                                  }
                                  else {
                                      this._itemsTickets = new observableArray.ObservableArray();
                                      return this._itemsTickets;
                                  }
                              },
                              enumerable: true,
                              configurable: true
                          });
    Object.defineProperty(TicketsPageViewModel.prototype, "itemsMinhaCarteira", {
                              get: function () {
                                  if (this._itemsMinhaCarteira != null) {
                                      return this._itemsMinhaCarteira;
                                  }
                                  else {
                                      this._itemsMinhaCarteira = new observableArray.ObservableArray();
                                      return this._itemsMinhaCarteira;
                                  }
                              },
                              enumerable: true,
                              configurable: true
                          });
    
    //###################################################
    //# CARREGA DADOS INICIAS DAS LISTAS
    //###################################################
    
    TicketsPageViewModel.prototype.carregaInicio = function (idusuario, cidade) {    
        var objItem;
        var _this = this;

        _this.beginLoading();
        //_this.itemsTickets.splice(0);
        serviceModule.service.getGetTickets(idusuario, cidade).then(function (ticketslist) {
            for (var i = 0; i < ticketslist.length; i++) {
                objItem = new observable.Observable();
                objItem.addEventListener(observable.Observable.propertyChangeEvent, function (pcd) {
                    //console.log(pcd.eventName.toString() + " " + pcd.propertyName.toString() + " " + pcd.value.toString());
                });

                objItem.set("id", ticketslist[i].id);
                objItem.set("titulo", ticketslist[i].titulo);
                objItem.set("thumb", _this.buscaImagemCached(ticketslist[i].thumb));
                objItem.set("banner", _this.buscaImagemCached(ticketslist[i].banner));
                objItem.set("nomeEmpresa", ticketslist[i].nomeEmpresa);
                objItem.set("promocao", ticketslist[i].promocao);

                //adiciona no observable array dos itens 
                _this.itemsTickets.push(objItem);
            }
            _this.endLoading();
        }, function (error) {
            _this.endLoading();
        }).then(function () {
            
            serviceModule.service.getMinhaCarteira(idusuario).then(function (minhacarteiralist) {
                _this.itemsMinhaCarteira.push(minhacarteiralist);
            }, function (error) {
                _this.endLoading();
            });
            
        });
    };
    
    
     //###################################################
    //# LOGOUT
    //###################################################
    TicketsPageViewModel.prototype.getMinhaCarteira = function () {
        
         var _this = this;
        
         serviceModule.service.getMinhaCarteira(global.idUsuario).then(function (minhacarteiralist) {
                _this.itemsMinhaCarteira.push(minhacarteiralist);
            }, function (error) {
                _this.endLoading();
            });
        
    }
    
    
    
    
    //###################################################
    //# LOGOUT
    //###################################################
    TicketsPageViewModel.prototype.logout = function () {
        navigationModule.navigate(viewsModule.Views.login);
    }
    
    //###################################################
    //# EMPRESAS
    //###################################################
    TicketsPageViewModel.prototype.goEmpresas = function () {
        navigationModule.navigate(viewsModule.Views.empresaspage);
    }
    
    
    //###################################################
    //# ATUALIZAR TICKETS
    //###################################################
    
    TicketsPageViewModel.prototype.refresh = function () {
        var _this = this;
        _this.beginLoading();
        var item;

        for (var i = 0; i < _this.itemsTickets.length; i++) {
            item = _this.itemsTickets.getItem(i);
            if (typeof item.thumb !== 'object') {
                item.set("thumb", _this.buscaImagemCached(item.thumb));
            }
            if (typeof item.banner !== 'object') {
                item.set("banner", _this.buscaImagemCached(item.banner));
            }
        }
        _this.endLoading();
    };
    
    //###################################################
    //# FAVORITO
    //###################################################
    TicketsPageViewModel.prototype.favorito = function (item) {
        item.set("thumb", this.buscaImagemCached("~/resources/images/logo.png"));
    };
    
    //###################################################
    //# GO DETALHE TICKET
    //###################################################
    TicketsPageViewModel.prototype.detalheTicket = function (item) {
        var _this = this
        _this.beginLoading();
        
        navigationModule.navigate({
                                      moduleName: viewsModule.Views.ticketsdetailpage,
                                      context: item
                                  });

        _this.endLoading();
    };
    
    //###################################################
    //# RESGATAR TICKET
    //###################################################
    TicketsPageViewModel.prototype.resgatarTicket = function (item) {
        var _this = this;
        _this.beginLoading();

        var idUsuario = global.idUsuario;
        var idEvento = item;
        
        console.log(idUsuario+" - "+idEvento);
        
        serviceModule.service.resgatarTicket(idUsuario, idEvento).then(function (e) {
            console.log(JSON.stringify(e));
            
            //_this.itemsTickets.splice(0);
            
            
            //atualiza a minha carteira
            _this.getMinhaCarteira(global.idUsuario);
            
            
        });

        _this.endLoading();
    };
    
    return TicketsPageViewModel;
})(viewModelBaseModule.ViewModelBase);

exports.TicketsPageViewModel = TicketsPageViewModel;