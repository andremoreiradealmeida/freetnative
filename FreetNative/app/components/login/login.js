var loginViewModelModule = require("./login-view-model");
var viewsModule = require("../../utils/views");
var viewModel;

function navigatedTo(args) {
    var page = args.object;
    viewModel = new loginViewModelModule.LoginViewModel();
    page.bindingContext = viewModel;
}
exports.navigatedTo = navigatedTo;

//###################################################
//# DO LOGIN
//###################################################
function tapLogin(args) {
    viewModel.login();
}
exports.tapLogin = tapLogin;

//###################################################
//# GO CADASTRO
//###################################################
function tapCadastro(args) {
    viewModel.cadastro();
}
exports.tapCadastro = tapCadastro;