$(document).ready(function() {
  var start = `<div class='entry' style='margin: 10px;'>\n`
  var close = `</div>`
  var backBtn = '<button id="foods-index">Back</button>'

  var foods = function() {
    foodSelected = false;
    $("#foods").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/foods', {
      method: 'get',
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => {
      $.each (response, function (index) {
        let link = `<h2><a class='food-show' id='${'food-'+response[index].id}' href='javascript:;'>`;
        let item = `${response[index].name}</a></h2>`;
        let cals = `<li>Cals: ${response[index].calories}</li>`;
        $("#foods").append(start + link + item + cals + close);
      })
      $('#foods').append('<button class="new-food">New</button>');

      $(".food-show").on("click", function() {
        foodSelected = true;
        var id = $(this).attr('id').split('-')[1];
        fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/foods/${id}`, {
          method: 'get',
          headers: {"Content-Type": "application/json"}
        })
        .then((response) => response.json())
        .then(response => {
					let item = `<h2>${response.name}</h2>\n`
					let cals = `<li>Cals: ${response.calories}</li>`
					let deleteBtn = '<button id="delete-food">Delete</button>'
					let editBtn = '<button id="edit-food">Edit</button>'

          let addToMeal = ''
          if (foodSelected && mealSelected) {
            addToMeal += '<button id="add-food">Add to Meal</button>'
          }

          $('#foods').empty().append(start + item + cals + close + backBtn + editBtn + deleteBtn + addToMeal)

          $("#foods-index").on("click", function() { foods(); });

          $("#delete-food").on("click", function() {
            fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/foods/${id}`, {
              method: 'delete',
              headers: {"Content-Type": "application/json"}
            })
            .then(() => foods())
            .catch(error => console.log(error))
          })

          $("#add-food").on("click", function() {
            console.log(mealId)
            console.log(id)
            fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/meals/${mealId}/foods/${id}`, {
              method: 'post',
              headers: {"Content-Type": "application/json"}
            })
            .then(() => foods())
            .catch(error => console.log(error))
          })

          $("#edit-food").on("click", function() {
            let form = `<h3>Edit Food</h3>
                			  <form id='submit-edit-food'>
                  				Name: <input type='text' name='Name' value=${response.name}><br>
                  				Calories: <input type='text' name='Calories' value=${response.calories}>
                					<input type='submit' value='Submit'><br>
                				</form>`
            $('#foods').empty().append(start + form + close + backBtn)

            $('#submit-edit-food').submit(function(evnt) {
              evnt.preventDefault();
              input = $(this).serialize().split('&');
          		let patchBody = { food: { name: input[0].split("=")[1],
          			                   calories: input[1].split("=")[1] } }
              fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/foods/${id}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(patchBody)
              })
              .then(() => foods())
              .catch(error => console.log(error))
            })

            $("#foods-index").on("click", function() { foods(); });
          })

        })
        .catch(error => console.log(error))
      })

      $(".new-food").on("click", function() {
        let form = `<h3>Add a new Food</h3>
          					<form id='submit-new-food'>
            					Name: <input type='text' name='Name'><br>
            					Calories: <input type='text' name='Calories'>
          						<input type='submit' value='Submit'><br>
          					</form>`
        $('#foods').empty().append(start + form + close + backBtn)

        $('#submit-new-food').submit(function(evnt) {
          evnt.preventDefault();
          input = $(this).serialize().split('&');
      		let postBody = { food: { name: input[0].split("=")[1],
      			                   calories: input[1].split("=")[1] } }
          fetch('https://calorie-tracker-be.herokuapp.com/api/v1/foods', {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postBody)
          })
          .then(() => foods())
          .catch(error => console.log(error))
        })

        $("#foods-index").on("click", function() { foods(); });
      })
    })
    .catch(error => console.log(error))
  }
  foods();
})
