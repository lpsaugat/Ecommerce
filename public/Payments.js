var shadow = document.querySelectorAll('.p_shadow');

function cardshadow(){
      
    for (i = 0; i <shadow.length; i++)
    {
            shadow[i].style.boxShadow = 'none';

    }
    shadow.forEach(function(button) {
        button.addEventListener('click', function() {
          button.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.25)';
        });
      });
}
