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

var CidadeViewModel = (function (_super) {
    __extends(CidadeViewModel, _super);

    //CONSTRUTOR
    function CidadeViewModel() {
        _super.call(this);                   
        
    }

    CidadeViewModel.prototype.buscarCidades = function (cidade) {    
        
        var _this = this;

        _this.beginLoading();
        
        serviceModule.service.trazCidades(cidade).then(function (r) {
              
          //console.log(JSON.stringify(r));
            consolçe.log(cidade);
                       
        }, function (error) {
            
         console.log("sem acesso");
        });
        
    };

    
    return CidadeViewModel;

})(viewModelBaseModule.ViewModelBase);
exports.CidadeViewModel = CidadeViewModel;
