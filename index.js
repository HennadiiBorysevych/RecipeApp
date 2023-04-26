const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector(".search-box");
// recipe fetch data
const ApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// listeners
searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchMeal();
  }
});

//handle meal function

function searchMeal() {
  const userInput = searchInput.value.trim();
  if (!userInput) {
    resultContainer.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    return;
  }

  fetch(ApiUrl + userInput)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const meal = data.meals[0];
      if (!meal) {
        resultContainer.innerHTML = `<h3>No Meal Found, Try Again, Please</h3>`;
        return;
      }
      const ingredients = getIngredients(meal);
      //generate html to display meal data
      const recipeHTML = `<div class="details">
      <h2>${meal.strMeal}</h2>
      <h4>${meal.strArea}</h4>
      </div>
      <img src=${meal.strMealThumb} alt=${meal.strMeal}>
      <div id="ingre-container">
      <h3>Ingredients:</h3>
      <ul>${ingredients}</ul>
      </div>
      <div id="recipe">
      <button id="hide-recipe">X</button>
      <pre id="instructions">${meal.strInstructions}</pre>
      </div>
      <button id="show-recipe">View Recipe</button>
      `;
      resultContainer.innerHTML = recipeHTML;
      const hideRecipeBtn = document.getElementById("hide-recipe");
      hideRecipeBtn.addEventListener("click", hideRecipe);
      const showRecipeBtn = document.getElementById('show-recipe');
      showRecipeBtn.addEventListener('click', showRecipe)
      searchContainer.style.opacity = "0";
      searchContainer.style.display = "none";
    }).catch(() => {
      searchContainer.style.opacity = "1";
      searchContainer.style.display = "grid";
      searchContainer.innerHTML = `<h3>Error fetching data!</h3>`;
    });
}
//generate html for list of indredients

function getIngredients(meal) {
  let ingreHtml = "";
  // there can be maxium of 20 ingredients
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingreHtml += `<li>${measure} ${ingredient}</li>`;
    }
    //if ingredient doesnt exist,exit loop
    else {
      break;
    }
  }
  return ingreHtml;
}

// handle show and hide recipe for a meal

function hideRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "none";
}
function showRecipe() {
  const recipe = document.getElementById("recipe");
  recipe.style.display = "block";
}
