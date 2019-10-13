$(document).ready(function() {
  var foods = function() {
    $("#foods").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/foods', {
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
        var cals = `<li>Cals: ${response[index].calories}</li>`
        var close = `</div>`
        $("#foods").append(start + item + cals + close)
      })
    })
    .catch(error => console.log(error))
  }

  foods();
})
