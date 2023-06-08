var menu = document.getElementById("menu");
var main = document.getElementById("main");
var menu1 = document.getElementById("menu1");
var navbutton = document.getElementById("navbutton");
var nav = document.getElementById("nav");

// menu1.classList.remove('bg-black');
// menu.classList.remove('transform');

function openMenu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    menu.style.overflow = "scroll";
    document.body.style.overflow = "hidden";
    navbutton.style.transform = "rotate(90deg)";
    nav.classList.remove("-z-10");
    menu1.classList.remove("-z-10");
    menu1.classList.add("bg-black");

    menu1.classList.add("z-40");
    nav.classList.add("z-40");
  } else {
    menu.classList.remove("flex");
    menu.classList.add("hidden");
    document.body.style.overflow = "auto";
    navbutton.style.transform = "rotate(180deg)";
    menu1.classList.remove("z-40");
    nav.classList.remove("z-40");
    nav.classList.add("-z-10");
    menu1.classList.add("-z-10");

    menu1.classList.remove("bg-black");
  }
}

function openMenu2() {
  menu.classList.remove("flex");
  menu.classList.add("hidden");
  menu1.classList.remove("bg-black");
  document.body.style.overflow = "auto";
  navbutton.style.transform = "rotate(180deg)";
  menu1.classList.remove("z-40");
  nav.classList.remove("z-40");
  nav.classList.add("-z-10");
  menu1.classList.add("-z-10");

  menu1.classList.remove("bg-black");
}

var contact = document.getElementById("contact");
var links = document.getElementById("links");
var contacth = document.getElementById("contacth");
var linkh = document.getElementById("linkh");
contacth.style.opacity = "0.5";

function footer2() {
  links.classList.remove("grid");
  contact.classList.remove("hidden");
  contact.classList.add("grid");
  links.classList.add("hidden");
  linkh.style.opacity = "0.5";
  contacth.style.opacity = "1";
}

function footer1() {
  links.classList.add("grid");
  contact.classList.add("hidden");
  contact.classList.remove("grid");
  links.classList.remove("hidden");
  linkh.style.opacity = "1";
  contacth.style.opacity = "0.5";
}

// function closeMenu() {

// }

function search() {
  var searchbutton = document.getElementById("searchbutton");
  var searchheader = document.getElementById("searchheader");
  var searchText = document.getElementById("searchText");

  searchbutton.style.display = "none";
  searchheader.style.display = "block";
  searchText.style.display = "block";
}
