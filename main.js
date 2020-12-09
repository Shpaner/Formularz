var currentPage = 0;

// on open show first tab
document.addEventListener('DOMContentLoaded', function() {
    showTab();
}, false)

function showTab() {

  // This function will display the specified tab of the form...
  var pages = document.getElementsByClassName("page");
  pages[currentPage].style.display = "block";
  //... and fix the Previous/Next buttons:
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
  //... and run a function that will display the correct step indicator:
  changeActiveIndicator(currentPage)
}

function nextPage(n) {

  document.getElementById("header").style.display = "block";
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("page");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validate()) return false;
  // Hide the current tab:
  x[currentPage].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentPage = currentPage + n;
  // if you have reached the end of the form...
  if (currentPage >= x.length) {
    // ... the form gets submitted:
    //document.getElementById("regForm").submit();
    
    alert("Dziękuje za wypełnienie formularza.")
    
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentPage);
}

function validate() {

  var pages, data
  var isValid = true;

  pages = document.getElementsByClassName("page");

  // page 1
  if (currentPage == 1) {
    // Select box
    data = pages[currentPage].getElementsByTagName("select")[0];
    if (data.options[data.selectedIndex].value == "") {
      isValid = false;
      data.className += "invalid";
    }
    
    // Input box
    data = pages[currentPage].getElementsByTagName("input")[0];
    if (data.value == "") {
      isValid = false;
      data.className += "invalid";
    }
  }

  // page 2
  else if (currentPage == 2) {
    // Number input box
    data = pages[currentPage].getElementsByTagName("input");
    for (var i = 0; i < data.length; i++) {
      if (data[i].type != "radio") {
        if (data[i].value == "") {
          isValid = false;
          data[i].className += "invalid";
        }
      } else {
        // check radio inputs
        if (data[i].checked) {
          isValid = true;
          break;
        } else {
          isValid = false;
        }
      }
    }
  }

  if (isValid) {
    document.getElementsByClassName("step")[currentPage].className += " finish";
  }

  return isValid;
}

function changeActiveIndicator(curPage) {
  // This function removes the "active" class of all steps...
  var steps = document.getElementsByClassName("step");
  for (var i = 0; i < steps.length; i++) {
    steps[i].className = steps[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  steps[curPage].className += " active";
}











  // else {
  //   data = pages[currentPage].getElementsByTagName("input");
  //   // A loop that checks every input field in the current tab:
  //   for (var i = 0; i < data.length; i++) {
  //     // If a field is empty...
  //     if (data[i].value == "") {
  //       // add an "invalid" class to the field:
  //       data[i].className += " invalid";
  //       // and set the current valid status to false
  //       isValid = false;
  //     }
  //   }
  // }