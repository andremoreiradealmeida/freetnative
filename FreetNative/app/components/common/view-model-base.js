var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var platformModule = require("platform");
var observableModule = require("data/observable");
var enumsModule = require("ui/enums");
var dialogsModule = require("ui/dialogs");
var stringsModule = require("../../resources/strings");

var imageCacheModule = require("ui/image-cache");
var imageSource = require("image-source");


var ViewModelBase = (function (_super) {
    __extends(ViewModelBase, _super);
    function ViewModelBase() {
        _super.call(this);
        this._loadingCount = 0;
    }
    Object.defineProperty(ViewModelBase.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            if (this._isLoading != value) {
                this._isLoading = value;
                this.notifyPropertyChanged("isLoading", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "androidVisibility", {
        get: function () {
            if (platformModule.device.os === platformModule.platformNames.android) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "iosVisibility", {
        get: function () {
            if (platformModule.device.os === platformModule.platformNames.ios) {
                return enumsModule.Visibility.visible;
            }
            return enumsModule.Visibility.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "strings", {
        get: function () {
            return stringsModule.strings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewModelBase.prototype, "imgCached", {
        get: function () {
            if (this._imgCached == null) {
                this._imgCached = new imageCacheModule.Cache();
                this._imgCached.maxRequests = 50;
            }
            return this._imgCached;
        },
        enumerable: true,
        configurable: true
    });
    
    ViewModelBase.prototype.beginLoading = function () {
        if (!this._loadingCount) {
            this.isLoading = true;
        }
        this._loadingCount++;
    };
    ViewModelBase.prototype.endLoading = function () {
        if (this._loadingCount > 0) {
            this._loadingCount--;
            if (!this._loadingCount) {
                this.isLoading = false;
            }
        }
    };

    ViewModelBase.prototype.showError = function (error) {
        dialogsModule.alert({ title: "Error", message: error, okButtonText: "Close" });
    };
    ViewModelBase.prototype.showInfo = function (message) {
        dialogsModule.alert({ title: "Info", message: message, okButtonText: "OK" });
    };
    ViewModelBase.prototype.showConfirm = function (title, message) {
        return dialogsModule.confirm({
            title: title,
            message: message,
            okButtonText: "YES",
            cancelButtonText: "NO"
        });
    };
    ViewModelBase.prototype.notifyPropertyChanged = function (propertyName, value) {
        this.notify({
            object: this,
            eventName: observableModule.Observable.propertyChangeEvent,
            propertyName: propertyName,
            value: value
        });
    };
    ViewModelBase.prototype.buscaImagemCached = function (url) {
        
        var _this = this;

        _this.imgCached.enableDownload();

        var img = _this.imgCached.get(url);
        if (img) {
            return imageSource.fromNativeSource(img);
        }
        else {
            _this.imgCached.push({
                key: url,
                url: url,
                completed: function (img, key) {
                    //if (url === key) {
                    //    return imageSource.fromNativeSource(img);
                    //}
                }
            });
            _this.imgCached.disableDownload();
            return url;
        }

    };

    return ViewModelBase;

})(observableModule.Observable);
exports.ViewModelBase = ViewModelBase;
