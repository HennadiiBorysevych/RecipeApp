const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector("search-box");
// recipe fetch data
const ApiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
// listeners
searchBtn.addEventListener('click', searchMeal)