const herocontainer = document.querySelector('.hero-container');
const navbar = document.querySelector('.nav-con');
const width = navbar.offsetHeight;
herocontainer.style.marginTop = `${width}px`;
const heroheight = window.innerHeight - width;
herocontainer.style.height=`${heroheight}px`;
console.log(heroheight,width);
const slider = document.querySelectorAll('.slide');
console.log(slider);
var initialwidth = slider[0].offsetWidth;
var limitwidth = initialwidth*3;
var xpos=initialwidth;
function moveright(value){
  if((xpos*value)- initialwidth !== 0){
   console.log((xpos*value)+initialwidth,xpos) ;
   xpos -=initialwidth;
   slider.forEach(s=>{
       s.style.transform = `translateX(-${(xpos*value)-initialwidth}px)`;
   });
  }

}

function moveleft(value){
  console.log("if",(xpos*value)+initialwidth,limitwidth);
  if((xpos*value)+initialwidth !== -limitwidth ){
    console.log((xpos*value)+initialwidth,xpos) ;
    xpos +=initialwidth;
    slider.forEach(s=>{
        s.style.transform = `translateX(${(xpos*value)+initialwidth}px)`;
    });
   }
}




// console.log(items)
// console.log("hello",Price);
// var items = [];
