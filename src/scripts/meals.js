
$(document).ready(function() {
  var start = `<div class='entry' style='margin: 10px;'>\n`
  var close = `</div>`
  var backBtn = '<button id="meals-index">Back</button>'

  var meals = function() {
    $("#meals").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/meals', {
      method: 'get',
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(response => {
      $.each (response, function (index) {
        let link = `<h2><a class='meal-show' id='${'meal-'+response[index].id}' href='javascript:;'>`;
        var item = `<h2>${response[index].name}</h2>`
        $("#meals").append(start + link + item + close)
      })

      $(".meal-show").on("click", function() {
        var id = $(this).attr('id').split('-')[1];
        fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/meals/${id}/foods`, {
          method: 'get',
          headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(response => {
          let item = `<h2>${response.name}</h2>`;

          let foods = '';
          $.each (response.Food, function (index) {
            let food = response.Food[index].name;
            foods += `<li>${food}</li>`;
          })
          
          $("#meals").empty().append(start + item +  foods + close + backBtn);

          $("#meals-index").on("click", function() { meals(); });
        })
      })
    })
    .catch(error => console.log(error))
  }

  meals();
})
