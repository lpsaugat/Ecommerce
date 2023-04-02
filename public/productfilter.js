  var subscribe = document.getElementById("subscribe");
  var familydrop = document.getElementById("familyd");
  var filtersidebar = document.getElementById('filtersidebarid');
  var filterside = document.getElementById('filtersideid');
  var filterback = document.getElementById('filterbg');
  var look = document.getElementsByClassName('checking');
  var family = document.getElementsByClassName('familyclass');
  var check = [];

  var accordionbuttonx = [];

  var dropdown = [];


  for(let i = 1; i<22; i++){
    check[i] = document.getElementsByClassName("check"+i);
    accordionbuttonx[i] = document.getElementsByClassName("accordionbutton"+i);
    dropdown[i] = document.getElementsByClassName("dropdown"+i);
  }


  function checkf(i){
    hideandshow(check[i][0]);
    hideandshow(check[i][1]);

  }
  

  function filtersidebarf(){
    if (filtersidebar.classList.contains('hidden')){
        filtersidebar.classList.remove('hidden');
        document.body.style.overflow='hidden';
        filterside.style.overflow='scroll';
        filtersidebar.classList.add('flex');


        filterside.classList.remove("-z-10");
        filterside.classList.add("z-40");
        filterback.classList.remove("-z-10");
        filterback.classList.add("z-40");
        filterback.classList.add("bg-black");

  }
  else{
    filtersidebar.classList.add('hidden');
    filtersidebar.classList.remove('flex');
    document.body.style.overflow='visible';

    filterside.classList.add("-z-10");
    filterside.classList.remove("z-40");
    filterback.classList.add("-z-10");
    filterback.classList.remove("z-40");
    filterback.classList.remove("bg-black");

}


}
function filterbgb(){
    filtersidebar.classList.add('hidden');
    filtersidebar.classList.remove('flex');
    document.body.style.overflow='visible';

    filterside.classList.add("-z-10");
    filterside.classList.remove("z-40");
    filterback.classList.add("-z-10");
    filterback.classList.remove("z-40");
    filterback.classList.remove("bg-black");
}







  function filterdropdown(d) {
    hideandshow(dropdown[d][0]);
    hideandshow(dropdown[d][1]);

    rotate(accordionbuttonx[d][0]);
    rotate(accordionbuttonx[d][1]);

  }





  function hideandshow(element) {
    if (element.style.display === "none") {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  }

  function rotate(element) {
    if (element.style.transform === "rotate(180deg)") {
      element.style.transform = "rotate(0deg)";
    } else {
      element.style.transform = "rotate(180deg)";
    }
  }

