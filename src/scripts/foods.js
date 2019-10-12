$(document).ready(function() {
  var foods = function() {
    $("#foods").empty()
    console.log('HELLO, HOUSTON?')
    $.ajax({
      type: "Get",
      dataType: 'jsonp',
      contentType: "application/json; charset=utf-8",
      url: "https://calorie-tracker-be.herokuapp.com/api/v1/foods",

      success: function (foodResults) {
        $.each (foodResults, function (index) {
          var start = `<div class='entry' style='margin: 10px;'>\n`
          var item = `<p>${foodResults[index]}</p>`
          var close = `</div>`
          $("#foods").append(start + item + close)
        })
      },

      error: function (error) {
        console.log('HOUSTON, WE HAVE A PROBLEM.')
        alert('Error!');
      }
    })
  }

  foods();
})
