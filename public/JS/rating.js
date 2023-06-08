var ratingbutton = document.querySelectorAll(".ratingbutton");
var rate = document.querySelectorAll(".star");
var unrate = document.querySelectorAll(".star-shade");

function rating(index, element) {
//   for (i = 0; i < rate.length; i++) {
//     rate[i].style.display = "none";

//     unrate[i].style.display = "block";
//   }

//   for (i = 0; i < rate.length; i++) {
//     rate[i].style.display = "block";
//     unrate[i].style.display = "none";
//     if (i === element) {
//       i = rate.length;
//     }

//     console.log(i)
//   }


    const rates = element.parentNode.querySelectorAll(".ratingbutton");

    for(let i=0; i<rates.length; i++){
        const r = rates[i];
        r.querySelector(".star").style.display = "none"
        r.querySelector(".star-shade").style.display = "block"
    }

    for(let i=0; i<rates.length; i++){
        const r = rates[i];

        r.querySelector(".star-shade").style.display = "none"
        r.querySelector(".star").style.display = "block"


        
        if(index === i){
            i = rates.length;
        }


    }


}
