// Global Query Slectors
const ingredientContainer = document.querySelector('.ingredient-container')
const modalContainer = document.querySelector('.modal-container');
const form = document.querySelector('form');
const titleInput = document.querySelector('#ingredient');

// Class: for adding a new ingredient 
class Ingredient {
  constructor(title, servingSize, protein, carbs, fat, servingAmount){
    this.title = title;
    this.servingSize = servingSize;
    this.protein = protein;
    this.carbs = carbs;
    this.fat = fat;
    this.servingAmount = servingAmount;
    this.id = Math.random();
  }
}

/////UI UPDATES/////
// Function: Create new ingredient in UI
function addIngredientToList(ingredient) {
  const newUIIngredient = document.createElement('div');
  newUIIngredient.classList.add('ingredient');
  newUIIngredient.innerHTML = `
    <span hidden>${ingredient.id}</span>
    <h2 class="ingredient__title">${ingredient.title}</h2>
    <p class="ingredient__body">${ingredient.body}</p>
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
  titleInput.focus();
  setTimeout(() => alertDiv.remove(), 2000)
}

// Function: View meal in modal

// Event: Close modal

//Event: Display ingredients

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
    const newIngredient = new Ingredient(titleInput, servingSizeInput, proteinInput, carbohydrateInput, fatInput, servingAmountInput);
    addIngredientToList(newIngredient);
    ingredientInput.value = '';
    servingSizeInput.value = '';
    proteinInput.value = '';
    carbohydrateInput.value = '';
    fatInput.value = '';
    servingAmountInput.value = '';
    showAlertMessage('Note successfully added', 'success-message');
    titleInput.focus();
  } else {
    showAlertMessage('Please Fill out all fields', 'alert-message');
  }
});

// Event: Calculate meal macros
