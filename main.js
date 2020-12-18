var currentPage = 0;

// on open show first page
document.addEventListener('DOMContentLoaded', function() {
    showpage();
}, false)

function showpage() {

  var pages = document.getElementsByClassName("page");
  pages[currentPage].style.display = "block";

  if (currentPage == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (currentPage == (pages.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Zakończ";
  } else {
    document.getElementById("nextBtn").innerHTML = "Dalej";
  }

  changeActiveSteps(currentPage)
}

function changePage(x) {

  document.getElementById("header").style.display = "block";
  var pages = document.getElementsByClassName("page");
  
  // validate current page
  if (x == 1 && !validatePage()) 
    return false;

  // hide current page
  pages[currentPage].style.display = "none";

  // change current page according to x
  currentPage = currentPage + x;
  
  // last page
  if (currentPage >= pages.length) {
    //document.getElementById("regForm").submit();
    
    document.getElementById("carForm").reset();
    currentPage = 0;
    showpage(currentPage);
    
    return false;
  }
  // Otherwise, display the correct tab:
  showpage(currentPage);
}

function validatePage() {

  var pages, data
  var isValid = true;

  pages = document.getElementsByClassName("page");

  // page 1
  if (currentPage == 1) {
    // Select box
    data = pages[currentPage].getElementsByTagName("select")[0];
    if (data.options[data.selectedIndex].value == "") {
      isValid = false;
      if (data.className == '')
        data.className += "invalid";
    }
    
    // Input box
    data = pages[currentPage].getElementsByTagName("input")[0];
    if (data.value == "") {
      isValid = false;
      if (data.className == '')
        data.className += "invalid";
    }
  }

  // page 2
  else if (currentPage == 2) {
    // number input box
    data = pages[currentPage].getElementsByTagName("input");
    for (var i = 0; i < data.length; i++) {
      if (data[i].type != "radio") {
        if (data[i].value == "") {
          isValid = false;
          if (data[i].className == '')
            data[i].className += "invalid";
        }
      } else {
        // radio inputs
        if (data[i].checked) {
          isValid = true;
          break;
        } else {
          isValid = false;
          var fs = pages[currentPage].getElementsByTagName("fieldset")[0];
          if (fs.className == '')
            fs.className += "invalid";
        }
      }
    }
  }

  // page 4
  else if (currentPage == 4) {
    data = pages[currentPage].getElementsByTagName("input");
    for (var i = 0; i < data.length; i++) {
      if (data[i].type == "date") {
        if (data[i].value == "") {
          isValid = false;
          if (data[i].className == '')
            data[i].className += "invalid";
        }
      }
    }

    // compare range values
    if (data[data.length - 6].value > data[data.length - 3].value) {
      isValid = false;
      document.getElementById("rangeAlert").style.visibility = "visible";
    } else {
      document.getElementById("rangeAlert").style.visibility = "hidden";
    }
  }

  // page 5
  else if (currentPage == 5) {
    data = pages[currentPage].getElementsByTagName("input");
    for (var i = 0; i < data.length; i++) {
      if (data[i].value == "") {
        isValid = false;
        if (data[i].className == '')
          data[i].className += " invalid";
      }
    }
  }

  if (isValid) {
    document.getElementsByClassName("step")[currentPage].className += " finish";
  }

  return isValid;
}

function changeActiveSteps(curPage) {

  // remove "active" status from all the steps
  var steps = document.getElementsByClassName("step");
  for (var i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  
  // make only current page active
  steps[curPage].className += " active";
}

// change class names to normal
function changeClassName() {
  document.getElementsByTagName("fieldset")[0].className = '';
}