var exemploViewModelModule = require("./exemplo-view-model");
var viewModel;

function navigatedTo(args) {
    var page = args.object;
    viewModel = new exemploViewModelModule.ExemploViewModel();
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;