var details = document.getElementsByClassName('details');
var underline = document.getElementsByClassName('d_underline');

function detailshow(element){
    for (i = 0; i <details.length; i++)
    {
        details[i].style.display = 'none';
        underline[i].style.textDecoration = 'none';

    }
    details[element].style.display = 'block';
    underline[element].style.textDecoration = 'underline';
}