//var navigationModule = require("../../utils/navigation");
var ticketspageViewModel = require("./tickets-page-view-model");
var ticketspageModel = new ticketspageViewModel.TicketsPageViewModel();
var dialogsModule = require("ui/dialogs");

var view = require("ui/core/view");
var tabMain;
var actionBarMain;

function navigatedTo(args) {
    var page = args.object;
    //page.bindingContext = null;
    page.bindingContext = ticketspageModel;
    ticketspageModel.refresh();
    
    //evento de change no menu tab (andre)
    tabMain = view.getViewById(page, "tabMain");
    tabMain.selectedIndex = 0;
    console.log(tabMain.selectedIndex);
    tabMain.on("propertyChange", function(e) {
        console.log(e.object.selectedIndex); 
    });
}
exports.navigatedTo = navigatedTo;


//################################################
//# chama o detalhe do ticket
//################################################
function thumbItemTap(args) {
    var item = args.view;
    ticketspageModel.detalheTicket(item.bindingContext);
}
exports.thumbItemTap = thumbItemTap;





//################################################
//# atualiza a lista de tickets
//################################################
function tapAtualizar() {
    ticketspageModel.carregaInicio(global.idUsuario, global.idCidade);
}
exports.tapAtualizar = tapAtualizar;


//################################################
//# chama tela de empresas
//################################################

function tapEmpresas() {
    ticketspageModel.goEmpresas();
}
exports.tapEmpresas = tapEmpresas;




//################################################
//# resgata o ticket
//################################################
function resgatarTicket(args) {
    var item = args.object;
    ticketspageModel.resgatarTicket(item.bindingContext.id);
}
exports.resgatarTicket = resgatarTicket;





//################################################
//# logout do app
//################################################
function tapLogout() {
    ticketspageModel.logout();
}
exports.tapLogout = tapLogout;



/*

function listViewItemLabelTap(args) {
    var view = args.view;
    var viewTicketspageViewModel = view.bindingContext;
    ticketspageModel.favorito(viewTicketspageViewModel);
}
exports.listViewItemLabelTap = listViewItemLabelTap;
*/