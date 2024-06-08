// here are dark mode jand navbar js code

const body = document.querySelector("body"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch");
  
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
});

// here will be single page aplication for navpages

const homepage = document.getElementById('homepage'),
gamepage = document.getElementById('gamepage'),
profilepage = document.getElementById('profilepage'),
inboxpage = document.getElementById('inboxpage'),
sittingpage = document.getElementById('sittingpage'),
logout = document.getElementById('logout');

const routing = (event) => {
  alert("hello we fjksjdfkj");
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handlelocation();
};
homepage.addEventListener('click', routing);
gamepage.addEventListener('click', routing);
profilepage.addEventListener('click', routing);
inboxpage.addEventListener('click', routing);
sittingpage.addEventListener('click', routing);


const routes = {
404: "i need a 404 error page",
"/": "../html/index.html",
"/profile": "../html/profile.html",
"/sitting": "../html/sitting.html",
"/inpox": "../html/index.html",
"/game": "../html/index.html",
};

const handlelocation = async () => {
const path = window.location.pathname;
const routing = routes[path] || routes[404];
alert(routing);
const html = await fetch(routing).then((data) => data.text());
  alert(html);
document.querySelector(".container .main-content").innerHTML = html;
};

window.onpopstate = handlelocation;
window.routing = routing;



// change information of users every user have his information profile ----------- 

