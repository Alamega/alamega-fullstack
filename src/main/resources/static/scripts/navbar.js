const menu = document.getElementById("navbar_menu");
const navbar = document.getElementById("navbar");
const btn = document.getElementById("navbar_btn");
menu.style.display = "none";
btn.addEventListener("click", () => {
    if (menu.style.display) {
        navbar.style.boxShadow = "0 0 4px black";
        menu.style.display = "";
    } else {
        navbar.style.boxShadow = "";
        menu.style.display = "none";
    }
});