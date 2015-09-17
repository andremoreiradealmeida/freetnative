var empresasViewModelModule = require("./empresas-page-view-model");
var viewModel;

function navigatedTo(args) {
    var page = args.object;
    viewModel = new empresasViewModelModule.EmpresasPageViewModel();
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;


function tapAtualizar() {
    viewModel.carregaInicio();
}
exports.tapAtualizar = tapAtualizar;

function tapItemEmpresa(args) {
    var item = args.object;
    viewModel.getTicketsEmpresa(item.bindingContext);
}
exports.tapItemEmpresa = tapItemEmpresa;

function tapVoltar(){
    viewModel.voltar();
}
exports.tapVoltar = tapVoltar;