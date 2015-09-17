var viewModel;

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();



function navigatedTo(args) {
    var page = args.object;
    viewModel = page.navigationContext;
    //page.bindingContext = null;
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;



function tapVoltar(){
    topmost.goBack();
}
exports.tapVoltar = tapVoltar;