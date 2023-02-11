// Global Query Slectors
const ingredientContainer = document.querySelector('.ingredient-container')
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');
const ingredientInput = document.querySelector('#ingredient');
const servingSizeInput = document.querySelector('#serving-size');
const proteinInput = document.querySelector('#protein');
const carbohydrateInput = document.querySelector('#carbohydrate');
const fatInput = document.querySelector('#fat');
const servingAmountInput = document.querySelector('#serving-amount');

// Class: for adding a new ingredient 
class Ingredient {
  constructor(ingredient, servingSize, protein, carbs, fat, servingAmount){
    this.ingredient = ingredient;
    this.servingSize = servingSize;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.servingAmount = servingAmount;
    this.id = Math.random();
  }
}

/// /LOCAL STORAGE////
// Function: Retreive ingredients from local storage
function getIngredients(){
  let ingredients;
  if(localStorage.getItem('ingredientApp.ingredients') === null){
    ingredients = [];
  } else {
    ingredients = JSON.parse(localStorage.getItem('ingredientApp.ingredients'));
  }
  return ingredients;
}

// Function: Add a ingredient to local storage
function addIngredientsToLocalStorage(ingredient){
  const ingredients = getIngredients();
  ingredients.push(ingredient);
  localStorage.setItem('ingredientApp.ingredients', JSON.stringify(ingredients));
}

// Function: remove a ingredient  from local storage
function removeIngredient(id){
  const ingredients = getIngredients();
  ingredients.forEach((ingredient, index) => {
    if (ingredient.id === id){
      ingredients.splice(index, 1);
    }
    localStorage.setItem('ingredientApp.ingredients', JSON.stringify(ingredients));
  })
}

/////UI UPDATES/////
// Function: Create new ingredient in UI
function addIngredientToList(ingredient) {
  const newUIIngredient = document.createElement('div');
  newUIIngredient.classList.add('ingredient');
  newUIIngredient.innerHTML = `
    <span hidden>${ingredient.id}</span>
    <h2 class="ingredient__title">${ingredient.ingredient}</h2>
    <p class="ingredient__body">${ingredient.servingSize}</p>
    <div class="ingredient__btns">
      <button class="ingredient__btn ingredient__view">View Details</button>
      <button class="ingredient__btn ingredient__delete">Delete Ingredient</button>
    </div>
  `;
  ingredientContainer.appendChild(newUIIngredient);
}

// Function: Show ingredient in UI
function displayIngredients(){
  const ingredients = getIngredients();
  ingredients.forEach(ingredient => {
    addIngredientToList(ingredient);
  })
}

// Function: Show alert message
function showAlertMessage(message, alertClass){
  const alertDiv = document.createElement('div');
  alertDiv.className = `message ${alertClass}`;
  alertDiv.appendChild(document.createTextNode(message));
  form.insertAdjacentElement('beforebegin', alertDiv);
  ingredientInput.focus();
  setTimeout(() => alertDiv.remove(), 2000)
}

// Function: View meal in modal

// Event: Close modal

// Event: Ingredient Buttons
ingredientContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains('ingredient__view')){
    const currentIngredient = e.target.closest('.ingredient');
    const currentTitle = currentIngredient.querySelector('.ingredient__title').textContent;
    const currentBody = currentIngredient.querySelector('.ingredient__body').textContent;
    activateIngredientModal(currentTitle, currentBody);
  }
  
  if(e.target.classList.contains('ingredient__delete')){
    const currentIngredient = e.target.closest('.ingredient');
    showAlertMessage('Your ingredient was permanently deleted', 'remove-message');
    currentIngredient.remove();
    const id = currentIngredient.querySelector('span').textContent;
    removeIngredient(Number(id))
  }
})

//Event: Display ingredients
document.addEventListener('DOMContentLoaded', displayIngredients)

// Event: Ingredient form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ingredientInput = document.querySelector('#ingredient');
  const servingSizeInput = document.querySelector('#serving-size');
  const proteinInput = document.querySelector('#protein');
  const carbohydrateInput = document.querySelector('#carbohydrate');
  const fatInput = document.querySelector('#fat');
  const servingAmountInput = document.querySelector('#serving-amount');

  // validate inputs
  if(ingredientInput.value.length > 0 && servingSizeInput.value.length > 0 && proteinInput.value.length > 0 && carbohydrateInput.value.length > 0 && fatInput.value.length > 0 && servingAmountInput.value.length > 0){
    const newIngredient = new Ingredient(ingredientInput.value, servingSizeInput.value, proteinInput.value, carbohydrateInput.value, fatInput.value, servingAmountInput.value);
    addIngredientToList(newIngredient);
    addIngredientsToLocalStorage(newIngredient);
    ingredientInput.value = '';
    servingSizeInput.value = '';
    proteinInput.value = '';
    carbohydrateInput.value = '';
    fatInput.value = '';
    servingAmountInput.value = '';
    showAlertMessage('Ingredient successfully added', 'success-message');
    ingredientInput.focus();
  } else {
    showAlertMessage('Please Fill out all fields', 'alert-message');
  }
});

// Event: Calculate meal macros
