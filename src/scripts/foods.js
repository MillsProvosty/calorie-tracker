$(document).ready(function() {
  var start = `<div class='entry' style='margin: 10px;'>\n`
  var close = `</div>`

  var foods = function() {
    $("#foods").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/foods', {
      method: 'get',
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => {
      $.each (response, function (index) {
        let link = `<h2><a class='food-show' id='${'food-'+response[index].id}' href='javascript:;'>`
        let item = `${response[index].name}</a></h2>`
        let cals = `<li>Cals: ${response[index].calories}</li>`
        $("#foods").append(start + link + item + cals + close)
      })
      let newBtn = '<button id="new-food">New</button>'
      $('#foods').append(newBtn)

      $(".new-food").on("click", function() {
        // let name = document.createElement("name");
        // var calories = document.createElement("calories");
        newFood();
      })

      $(".food-show").on("click", function() {
        let id = $(this).attr('id').split('-')[1];
        fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/foods/${id}`, {
          method: 'get',
          headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(response => {
					let item = `<h2>${response.name}</h2>\n`
					let cals = `<li>Cals: ${response.calories}</li>`
					let backBtn = '<button id="foods-index">Back</button>'
					let deleteBtn = '<button id="delete-food">Delete</button>'
					let editBtn = '<button id="edit-food">Edit</button>'
					$('#foods').empty().append(start + item + cals + backBtn + editBtn + deleteBtn + close)

          $("#foods-index").on("click", function() {
						foods();
					});
        })
        .catch(error => console.log(error))
      })
    })
    .catch(error => console.log(error))
  }

  foods();

  var newFood = function() {
    $('#foods').empty().append('<div></div>');
  }

})
