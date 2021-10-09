const limit = [1,2,3];
var slidesIndex = 1;
showslides(slidesIndex,0);

function forward(n) {
  showslides(slidesIndex += n,1);
}
function backward(n) {
  showslides(slidesIndex += n,-1);
}

function showslides(n,d) {
  const slides = document.querySelectorAll(".slides");
  if (n >slides.length) {
    slidesIndex = 1;
  }
  if (n < 1) {
    slidesIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    if(slides[i].classList.contains('right')){
        slides[i].classList.remove('right');
    }
    if(slides[i].classList.contains('left')){
        slides[i].classList.remove('left');
    }
  }
  slides[slidesIndex-1].style.display="";
  if(d == 1 ){
    slides[slidesIndex-1].classList.add('right');
  }else if(d == -1){
    slides[slidesIndex-1].classList.add('left'); 
  }
  console.log(slidesIndex,slides.length);
 
}
// setInterval(()=>{
//     slidesIndex++;
//     showslides(slidesIndex,1)
//    }, 5000);



