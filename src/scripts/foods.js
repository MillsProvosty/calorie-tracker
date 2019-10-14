$(document).ready(function() {
  var foods = function() {
    $("#foods").empty()

    fetch('https://calorie-tracker-be.herokuapp.com/api/v1/foods', {
      method: 'get',
      headers: {"Content-Type": "application/json"}
    })
    .then(response => response.json())
    .then(response => {
      $.each (response, function (index) {
        let start = `<div class='entry' style='margin: 10px;'>\n`
        let link = `<h2><a class='food-show' id='${'food-'+response[index].id}' href='javascript:;'>`
        let item = `${response[index].name}</a></h2>`
        let cals = `<li>Cals: ${response[index].calories}</li>`
        let close = `</div>`
        $("#foods").append(start + link + item + cals + close)
      })

      $(".food-show").on("click", function() {
        let id = $(this).attr('id').split('-')[1];
        fetch(`https://calorie-tracker-be.herokuapp.com/api/v1/foods/${id}`, {
          method: 'get',
          headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(response => {
          let start = `<div class='entry' style='margin: 10px;'>\n`
					let item = `<h2>${response.name}</h2>\n`
					let cals = `<li>Cals: ${response.calories}</li>`
          let close = `</div>`
					let backBtn = '<button type="button" id="foods-index">Back</button>'
					let deleteBtn = '<button type="button" id="delete-food">Delete</button>'
					let editBtn = '<button type="button" id="edit-food">Edit</button>'
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
})
