const acess = document.querySelector('.acesspoints')
const navbar = document.querySelector('.nav-container');
const width = navbar.offsetHeight;
acess.style.marginTop = `${width+50}px`
const flexacess = document.querySelector('.acesspointsflex');
const map = document.querySelector('#mapid');
map.style.height = `${flexacess.offsetHeight}px`
