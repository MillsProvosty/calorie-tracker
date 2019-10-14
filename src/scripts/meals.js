$(document).ready(function() {
  var meals = function() {
    $("#meals").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/meals', {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      $.each (response, function (index) {
        var start = `<div class='entry' style='margin: 10px;'>\n`
        var item = `<h2>${response[index].name}</h2>`
        var close = `</div>`
        $("#meals").append(start + item + close)
      })
    })
    .catch(error => console.log(error))
  }

  meals();
})
