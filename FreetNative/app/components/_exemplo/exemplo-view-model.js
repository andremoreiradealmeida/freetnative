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


var ExemploViewModel = (function (_super) {
    __extends(ExemploViewModel, _super);

    //CONSTRUTOR
    function ExemploViewModel() {
        _super.call(this);
    }

    Object.defineProperty(ExemploViewModel.prototype, "Exemplo", {
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


    ExemploViewModel.prototype.MeuExemplo = function () {
    
    };

    return ExemploViewModel;

})(viewModelBaseModule.ViewModelBase);
exports.ExemploViewModel = ExemploViewModel;
