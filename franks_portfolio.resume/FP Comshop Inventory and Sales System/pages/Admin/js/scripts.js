const sidebarToggle = document.body.querySelector('#sidebarToggle');

if(sidebarToggle){

sidebarToggle.addEventListener('click', function(e){

e.preventDefault()

document.body.classList.toggle('sb-sidenav-toggled')

document.querySelector("#layoutSidenav_nav")
.style.transition="all .3s ease"

localStorage.setItem(
'sb|sidebar-toggle',
document.body.classList.contains('sb-sidenav-toggled')
)

})

}

$(function() {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});

document.body.style.opacity="0"

window.addEventListener("load",()=>{

document.body.style.transition="opacity .4s ease"
document.body.style.opacity="1"

})