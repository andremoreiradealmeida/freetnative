var cadastroViewModelModule = require("./cadastro-view-model");
var viewModel;

function navigatedTo(args) {
    var page = args.object;
    viewModel = new cadastroViewModelModule.CadastroViewModel();
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;


function tapCadastro(args) {
    viewModel.cadastro();
}
exports.tapCadastro = tapCadastro;

function tapCidade(args) {
    viewModel.buscaCidades();
}
exports.tapCidade = tapCidade;

function voltar(){
    
 console.log("voltei");   
    
}
exports.voltar = voltar;