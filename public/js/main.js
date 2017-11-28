$(function() {
  console.log("jQuery was loaded");
});
         
$(document).ready(function() {

  function toggleSidebar() {
    $(".button").toggleClass("active");
    $("main").toggleClass("move-to-left");
    $(".sidebar-item").toggleClass("active");
  }

  $(".button").on("click tap", function() {
    toggleSidebar();
  });

  // $("#catalog").on("click"){
      console.log('catalog button clicked');
    // $.get('http:localhost:3000/catalog', function(data){
      
    // })
  // }

});
  
function showpage(page) {
  $("#page1").hide();
  $("#page2").hide();
  $("#page3").hide();
  $("#page4").hide();

  if (page === 1) {
    $("#page1").show();
    
  }
  else if (page === 2) {
    $("#page2").show();
  }
  else if (page === 3) {
    $("#page3").show();
  }
  else if (page === 4) {
    $("#page4").show();
  }
}


var choices = ["","No prerequisites for MATH 175.","No prerequisites for MATH 180.","No prerequisites for CMPS 160.","No prerequisites for CMPS 161.","CMPS 160 - DATABASES is a prerequisite for CMPS 162.", "No prerequisites for CMPS 163.", "CMPS 162 - INTRODUCTION TO PROGRAMMING is a prerequisite for CMPS 260.", "CMPS 162 - INTRODUCTION TO PROGRAMMING is a prerequisite for CMPS 261.", "CMPS 260 - DATA STRUCTURES is a prerequisite for CMPS 262.", "All I.T. core classes must be completed before taking this course."];

window.onload=function() {
  document.getElementById("course-dropdown").onchange=function() {
    if (this.value !== 0) alert(choices[this.value]);
  }
}    