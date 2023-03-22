  var subscribe = document.getElementById("subscribe");
  var familydrop = document.getElementById("familyd");
  var filtersidebar = document.getElementById('filtersidebarid');
  var filterside = document.getElementById('filtersideid');
  var filterback = document.getElementById('filterbg');

  var check = [];

  var accordionbuttonx = [];

  var dropdown = [];


  for(let i = 1; i<22; i++){
    check[i] = document.getElementById("check"+i);
    accordionbuttonx[i] = document.getElementById("accordionbutton"+i);
    dropdown[i] = document.getElementById("dropdown"+i);
  }


  function checkf(d){
    hideandshow(check[d]);
  }
  

  function filtersidebarf(){
    if (filtersidebar.classList.contains('hidden')){
        filtersidebar.classList.remove('hidden');
        document.body.style.overflow='hidden';
        filterside.style.overflow='scroll';
        filtersidebar.classList.add('flex');
        filtersidebar.style.overflow='scroll';


        filterside.classList.remove("-z-10");
        filterside.classList.add("z-50");
        filterback.classList.remove("-z-10");
        filterback.classList.add("z-50");
        filterback.classList.add("bg-black");

  }
  else{
    filtersidebar.classList.add('hidden');
    filtersidebar.classList.remove('flex');
    document.body.style.overflow='visible';

    filterside.classList.add("-z-10");
    filterside.classList.remove("z-50");
    filterback.classList.add("-z-10");
    filterback.classList.remove("z-50");
    filterback.classList.remove("bg-black");

}


}
function filterbgb(){
    filtersidebar.classList.add('hidden');
    filtersidebar.classList.remove('flex');
    document.body.style.overflow='visible';

    filterside.classList.add("-z-10");
    filterside.classList.remove("z-50");
    filterback.classList.add("-z-10");
    filterback.classList.remove("z-50");
    filterback.classList.remove("bg-black");
}







  function filterdropdown(d) {
    hideandshow(dropdown[d]);
    rotate(accordionbuttonx[d]);
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

