var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var viewModelBaseModule = require("../common/view-model-base");
var navigationModule = require("../../utils/navigation");
var serviceModule = require("../../utils/service");
var viewsModule = require("../../utils/views");

var TicketsDetailPageViewModel = (function (_super) {
    __extends(TicketsDetailPageViewModel, _super);

    function TicketsDetailPageViewModel() {
        _super.call(this);
    }

    return TicketsDetailPageViewModel;
})(viewModelBaseModule.ViewModelBase);
exports.TicketsDetailPageViewModel = TicketsDetailPageViewModel;