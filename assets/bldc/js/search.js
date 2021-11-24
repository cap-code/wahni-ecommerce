const navsearch = document.querySelector(".nav-search");
const msearch = document.querySelector(".m");
console.log(
  window.getComputedStyle(document.querySelector(".search-input"), null).display
);
const input =
  window.getComputedStyle(document.querySelector(".search-input"), null)
    .display != "none"
    ? document.querySelector(".search-input")
    : document.querySelector(".sea-m");
input.addEventListener("input", (evt) => {
  closeAllLists();
  console.log(evt.data);
  const text = input.value;
  var flag = false;
  const a = document.createElement("DIV");
  a.setAttribute("id", "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  const suggetionswidth =
    document.querySelector(".nav-search").offsetWidth != 0
      ? document.querySelector(".nav-search").offsetWidth
      : document.querySelector(".m").offsetWidth;
  const top = document.querySelector(".nav-search").offsetWidth != 0
    ? 50
    : 95;
  a.style.top = `${top}%`;  
  a.style.minWidth = `${suggetionswidth}px`;
  input.parentNode.appendChild(a);
  if (text.length > 0 && text !== " " && evt.data !== null) {
    navsearch.style.borderBottomLeftRadius = "0px";
    navsearch.style.borderBottomRightRadius = "0px";
    msearch.style.borderBottomLeftRadius = "0px";
    msearch.style.borderBottomRightRadius = "0px";
    for (var i = 0; i < items.length; i++) {
      if (
        items[i].web_item_name.toLowerCase().indexOf(text.toLowerCase()) > -1
      ) {
        console.log(items[i].web_item_name);
        flag = true;
        const b = document.createElement("DIV");
        b.innerHTML += items[i].web_item_name;
        b.innerHTML +=
          "<input type='hidden' value='" +
          items[i].web_item_name +
          "' class='" +
          items[i].web_item_name +
          "' data-route ='" +
          i +
          "'>";
        b.addEventListener("click", function (e) {
          input.value = this.getElementsByTagName("input")[0].value;
          input.setAttribute(
            "data-route",
            this.getElementsByTagName("input")[0].getAttribute("data-route")
          );
        });
        a.appendChild(b);
      }
    }
    if (!flag) {
      console.log("no result found");
      const b = document.createElement("DIV");
      b.innerHTML += "no result found";
      a.appendChild(b);
    }
  }
  console.log(text);
});
function closeAllLists(elmnt) {
  navsearch.style.borderBottomLeftRadius = "30px";
  navsearch.style.borderBottomRightRadius = "30px";
  msearch.style.borderBottomLeftRadius = "30px";
    msearch.style.borderBottomRightRadius = "30px";
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != input) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
  closeAllLists(e.target);
  navsearch.style.borderBottomLeftRadius = "30px";
  navsearch.style.borderBottomRightRadius = "30px";
  msearch.style.borderBottomLeftRadius = "30px";
    msearch.style.borderBottomRightRadius = "30px";
});
input.addEventListener("keydown", function (e) {
  var x = document.getElementById("autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) {
    //up
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (x) x[currentFocus].click();
    }
  }
});
function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("autocomplete-active");
}
function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}
document.querySelector(".search-icon").addEventListener("click", (e) => {
  e.preventDefault();
  const r = input.getAttribute("data-route");
  window.location = "http://103.86.176.198/" + items[r].route;
});
