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
  $(".jsonTable").hide();
  //Create table, buttons, and events for course catalog
  $("#catalog").on("click", function(){

    //Fetch courses data from server and build table
    $.get('/catalog', function(data){
      $("#catalog").hide();
      $("#jsonTable").show();
      var headers = ["year", "term", "code", "title", "credits"];
      var table = $("<table></table>");
      $("#jsonTable").append(table);
      //Create Table Headers
      var tr = $("<tr>");
      table.append(tr);
      tr.append($("<th>"));
      for (var j = 0; j < headers.length; j++){
        var th = $("<th>");
        tr.append(th);
        th.append(headers[j].toUpperCase());
      }
      //Create table course rows
      for (var i = 0; i < data.length; i++){
        var tr = $("<tr id='course-rows'>");
        table.append(tr);
        var courseID = data[i].courseID;
        tr.append("<td><input type='checkbox' id=" + courseID + "></td>");
        //Fill table cell values
        for (var j = 0; j < headers.length; j++){
          var td = $("<td>");
          tr.append(td);
          td.append(data[i][headers[j]]);
        }
      }
      $("#jsonTable").append(addBtn, dropBtn);
    });//end GET

    //create add and drop buttons
    var addBtn = $("<a href='#' id='add' class='btn-big-green'>Add a course</a>");
    var dropBtn = $("<a href='#' id='drop' class='btn-big-green'>Drop a course</a>");

    //add and drop button event handlers
    $(addBtn).add(dropBtn).on("click", function(e){
      e.stopPropagation();

      //Tells AJAX wheter to add or drop courses
      var action = $(this).attr("id");
      console.log(action + " button clicked");
      var selected = [];

      for(var i = 0; i < $("input:checked").length; i++){
        selected.push($("input:checked")[i].id);
      }

      if (selected.length == 0){
         $("#addDropResult").html("Please select a class to add drop").css("color", "red");
         return false;
      }

      //Send course data to server
      $.ajax({
        type: "POST",
        url: '/updateSchedule',
        data: {
          "userId": "1",
          "data": selected,
          "action": action
        },
        success: function(){
          $("#addDropResult").html("You have successfully updated your schedule!").css("color", "white");
          console.log("successfully sent data to server");
        },
        error: function(){
          $("#addDropResult").html("Unable to update schedule at this time").css("color", "red");
          console.log("data not sent to server");
        }
      });//end POST
    });//end add/drop events
  });//end catalog button click event

  //Create schedule table for courses user is currently taking
  $("#schedule").on("click", function(){
    
    //Fetch courses data from server and build table
    $.get('/schedule', function(data){

      $("#schedule").hide();
      $("#scheduleTable").show();

      var headers = ["year", "term", "code", "title", "credits"];
      var table = $("<table></table>");
      $("#scheduleTable").append(table);

      //Create Table Headers
      var tr = $("<tr>");
      table.append(tr);

      for (var j = 0; j < headers.length; j++){
        var th = $("<th>");
        tr.append(th);
        th.append(headers[j].toUpperCase());
      }

      var creditTotal = 0;

      //Create table course rows
      for (var i = 0; i < data.length; i++){
        var tr = $("<tr id='course-rows'>");
        table.append(tr);

        //Fill table cell values
        for (var j = 0; j < headers.length; j++){

          if(headers[j] == "credits"){
            creditTotal += parseInt(data[i][headers[j]]);
          }

          var td = $("<td>");
          tr.append(td);
          td.append(data[i][headers[j]]);
        }
      }

      $("#scheduleTable").append("<div id=creditCount></div>");
      $("#creditCount").html("Credits in progress: " + creditTotal);
    });//end GET

  });//end schedule button click event

  $("#page3").on("click", function(){
    showpage(5);

    $.get('/progress', function(data){

      var table = $("<table></table>");
      $("#futureCourses").append(table);

      var inList = [];

      //Create table course rows
      for (var k = 0; k < 3; k++){
        var tr = $("<tr></tr>");
        table.append(tr);

        var limit = data.length
        var randomIndex = Math.floor(Math.random() * limit) + 1;
        
        var td = $("<td></td>");
        tr.append(td);
        td.append(data[randomIndex]);

        inList.push(data[randomIndex]);
      }

    });
  });

});//end document ready

function showpage(page) {
  $("#page1").hide();
  $("#page2").hide();
  $("#page3").hide();
  $("#page4").hide();
  $("#page5").hide();
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
  else if (page === 5) {
    $("#page5").show();
  }
}
  
function choice1(selected) {   
  if(selected.options[selected.selectedIndex].text === "MATH 175 - ELEMENTARY STATISTICS"){
    alert("No prerequisites for MATH 175.");
  } else if(selected.options[selected.selectedIndex].text === "MATH 180 - COLLEGE ALGEBRA"){
      alert("No prerequisites for MATH 180.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 160 - DATABASES"){
      alert("No prerequisites for CMPS 160.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 161 - NETWORKING AND SECURITY"){
      alert("No prerequisites for CMPS 161.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 162 - INTRODUCTION TO PROGRAMMING"){
      alert("CMPS 160 - DATABASES is a prerequisite for CMPS 162.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 163 - BUSINESS ANALYTICS"){
      alert("No prerequisites for CMPS 163.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 260 - DATA STRUCTURES"){
      alert("CMPS 162 - INTRODUCTION TO PROGRAMMING is a prerequisite for CMPS 260.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 261 - SERVER MANAGEMENT"){
      alert("CMPS 162 - INTRODUCTION TO PROGRAMMING is a prerequisite for CMPS 261.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 262 - ADVANCED PROGRAMMING"){
      alert("CMPS 260 - DATA STRUCTURES is a prerequisite for CMPS 262.");
  } else if(selected.options[selected.selectedIndex].text === "CMPS 480 - SENIOR PROJECT"){
      alert("All I.T. core classes must be completed before taking this course.");
  }
}
