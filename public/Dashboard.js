var dashboardmenu = document.getElementsByClassName('dashboardmenu')
var menubg = document.getElementsByClassName('menubg')
var logout = document.getElementById('logout')


function dashboardshow(element){
    for (i=0;i<3;i++){
        menubg[i].style.backgroundColor = 'white';

        dashboardmenu[i].style.display = 'none';
    }
    dashboardmenu[element].style.display = 'block';
    menubg[element].style.backgroundColor = '#d9d9d9';
}

function logoutf(){
    logout.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cancelf(){
    logout.style.display = 'none';
    document.body.style.overflow = 'auto'

}