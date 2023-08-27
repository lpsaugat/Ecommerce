vendorclasses = document.querySelectorAll('vendor');

function vendorbutton(element){
    for (var i =0; i<vendorclasses.length; i++ ){
        document.body
        vendorclasses[i].style.textDecoration = "none";
    }
    element.querySelector('vendor').style.textDecoration = 'underline';
        

    
}