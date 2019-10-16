var start = `<div class='entry' style='margin: 10px;'>\n`
var close = `</div>`
var mealsIndexBtn = '<button id="meals-index">Back</button>'

removeFood = function(id) {
  fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/meals/${mealId}/foods/${id}`, {
    method: 'delete',
    headers: {"Content-Type": "application/json"}
  })
  .then(() => showMeal())
  .catch(error => console.log(error))
}

showMeal = function() {
  fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/meals/${mealId}/foods`, {
    method: 'get',
    headers: {"Content-Type": "application/json"}
  })
  .then(response => response.json())
  .then(response => {
    let item = `<h2>${response.name}</h2>`;

    let mealFoods = '';
    $.each (response.Food, function (index) {
      let food = response.Food[index].name;
      mealFoods += `<li>${food} `;
      mealFoods += `<button id="${response.Food[index].id}" `;
      mealFoods += `class="remove-food">Remove</button></li>`;
    })

    if (foodId != 0 && mealId != 0) { showFood(); }

    $("#meals").empty().append(start + item +  mealFoods + close + mealsIndexBtn);

    $("#meals-index").on("click", function() { meals(); });
    $("#add-food").on("click", function() { addFood(); })
    $(".remove-food").on("click", function() { removeFood(this.id); });
  })
}

$(document).ready(function() {
  meals = function() {
    mealId = 0;
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
        mealId = $(this).attr('id').split('-')[1];
        showMeal();
      })
    })
    .catch(error => console.log(error))
  }
  meals();
})
