var dashboardmenu = document.getElementsByClassName('dashboardmenu')
var menubg = document.getElementsByClassName('menubg')
var logout = document.getElementById('logout')
var deleteitem = document.getElementById('deleteitem')
var dheading = document.getElementsByClassName('dheading')
var passwordsh = document.getElementsByClassName('passwordtoggle')
var passhide = document.getElementsByClassName('passhide')
var passshow = document.getElementsByClassName('passshow')
var mobmenu = document.getElementById('mob-menu')


function dashboardshow(element){
    for (i=0;i<3;i++){
        menubg[i].style.backgroundColor = 'white';

        dashboardmenu[i].style.display = 'none';
        dheading[i].style.display = 'none';

    }
    dashboardmenu[element].style.display = 'block';
    menubg[element].style.backgroundColor = '#d9d9d9';
    dheading[element].style.display = 'flex';

    document.getElementById('mdcart').style.display = 'none'

}

function carttoggle(){
    document.getElementById('mdcart').style.display = 'block'
}

function logoutf(){
    logout.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cancelf(){
    logout.style.display = 'none';
    document.body.style.overflow = 'auto'

}

function deletef(){
    deleteitem.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cancelfdelete(){
    deleteitem.style.display = 'none';
    document.body.style.overflow = 'auto'

}

function passwordshow(element){
    passhide[element].style.display = 'none'
    passshow[element].style.display = 'block'
    passwordsh[element].type = 'text'

}

function passwordhide(element){
    passhide[element].style.display = 'block'
    passshow[element].style.display = 'none'
    passwordsh[element].type = 'password'


}

function mobmenudisplay(){

    if (mobmenu.style.display === 'none'){
        mobmenu.style.display = 'block'
        document.getElementById('mobmenuaccordion').style.transform = 'rotate(0deg)';

    }
    else if(mobmenu.style.display === 'block'){
        mobmenu.style.display = 'none';
        document.getElementById('mobmenuaccordion').style.transform = 'rotate(180deg)';

    }
}

 