var frameModule = require("ui/frame");
var topmost = frameModule.topmost();

var cidadeViewModelModule = require("./cidade-view-model");
var cidadeModule = new cidadeViewModelModule.CidadeViewModel();




function navigatedTo(args) {
    
    var page = args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel;
    
    cidadeModule.buscarCidades(viewModel.cidade);
    
}
exports.navigatedTo = navigatedTo;



function tapVoltar(){
    topmost.goBack();
}
exports.tapVoltar = tapVoltar;

