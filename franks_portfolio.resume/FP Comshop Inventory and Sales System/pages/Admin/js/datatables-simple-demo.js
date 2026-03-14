window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});

window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimples');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});

window.addEventListener('DOMContentLoaded', event => {
    const datatableComputers = document.getElementById('datatable-computers');
    if (datatableComputers) {
        new simpleDatatables.DataTable(datatableComputers);
    }
});

document.addEventListener("DOMContentLoaded",function(){

const table = document.querySelector("#datatable-computers");

if(table){

new simpleDatatables.DataTable(table,{
searchable:true,
fixedHeight:true,
perPage:5
});

}

});

document.body.style.opacity="0";

window.addEventListener("load",function(){

document.body.style.transition="opacity .4s ease";
document.body.style.opacity="1";

});