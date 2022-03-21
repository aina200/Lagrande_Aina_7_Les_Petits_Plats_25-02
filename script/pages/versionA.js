import recipes from ".../data/recipes.js";
import renderRecipes from "../factory/displayRecipe.js";

// DOM 
const searchbar = document.querySelector('#searchbar');
const recipesSection = document.getElementById("main-section");
const invalidSearchInput = document.querySelector('#error');

let listOfIngredients = document.getElementById("ingredientsList");
let listOfDevices = document.getElementById("devicesList");
let listOfUstensils = document.getElementById("ustensilsList");

const sectiontag = document.getElementById("tags_button_section");
let filteredTable = null;
let tagsTable = [];

renderRecipes(recipes);
// RECIPE FILTER
const RecipeFilter = (wordToFind, recipeArray) => {
  const filteredArray = [];
  for (let i = 0; i < recipeArray.length; i++) {
    const ingredients = recipeArray[i].ingredients;
    const ingredientTable = [];
    for (let y = 0; y < ingredients.length; y++) {
      ingredientTable.push(ingredients[y].ingredient);
    }
    if (matchInput(recipeArray[i].name, wordToFind) || matchInput(recipeArray[i].description, wordToFind) || matchWithTable(ingredientTable, wordToFind)) {
      filteredArray.push(recipeArray[i]);
    } 
  }
  return filteredArray;
};
//  FILTER INGRIDIENTS ON TAG CLICK 
const FilterRecipesByIngredient = (ingredientName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    let ingredients = recipe.ingredients;
    let ingredientTable = [];
    ingredients.forEach((ingr) => {
      ingredientTable.push(ingr.ingredient);
    });
    if (matchWithTable(ingredientTable, ingredientName)) {
      return recipe;
    } 
  });
  return filteredArray;
};
//  FILTER DEVICE ON TAG CLICK 
const FilterRecipesByDevice = (deviceName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchInput(recipe.appliance, deviceName)) {
      return recipe;
    } 
  });
  return filteredArray;
};

//  FILTER USTENSIL ON TAG CLICK 
const FilterRecipesByUstensil = (ustensilName, recipeArray) => {
  const filteredArray = recipeArray.filter((recipe) => {
    if (matchWithTable(recipe.ustensils, ustensilName)) {
      return recipe;
    }
  });
  return filteredArray;
};

// MATCH BETWEEN A WORD AND CHARACTER STRING 
const matchInput = (string, inputword) => {
  return string.toLowerCase().match(inputword.toLowerCase()) ? true : false;
};

// MATCH BETWEEN A WORD AND ARRAY OF STRING 
const matchWithTable = (tableOfStrings, inputword) => {
  let newTable = [];
  tableOfStrings.forEach((string) => {
    newTable.push(string.toLowerCase());
  });
  tableOfStrings.forEach((string) => {
    string.toLowerCase();
  });
  let found = newTable.find((element) =>
    element.match(inputword.toLowerCase())
  );
  if (found != undefined) {
    return true;
  } else {
    return false;
  }
};

// RESULT BY TAG 
let ResultByTag = () => {
  if (filteredTable === null && tagsTable.length > 0) {
    filteredTable = recipes;
    tagsTable.forEach((tag) => {
      
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = null;
  } else if (filteredTable === null && tagsTable.length === 0) {
    renderRecipes(recipes);
  } else if (filteredTable.length > 0 && tagsTable.length > 0) {
    const rootTable = filteredTable;
    tagsTable.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          filteredTable = FilterRecipesByIngredient(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "device":
          filteredTable = FilterRecipesByDevice(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        case "ustensil":
          filteredTable = FilterRecipesByUstensil(tag.name, filteredTable);
          renderRecipes(filteredTable);
          break;
        default:
          console.log("error");
      }
    });
    filteredTable = rootTable;
  } else {
    renderRecipes(filteredTable);
  }
};

// CLOSE TAG
const ClosureOfTags = () => {
  const closeBtn = document.querySelectorAll(".btntag__cross_container");
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tagBtn = e.target.parentNode.parentNode;
      const tagNameTrimed = tagBtn.textContent.trim();
      if (tagBtn.className === "btntag btntag__blue") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ingredient") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else if (tagBtn.className === "btntag btntag__green") {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "device") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      } else {
        tagsTable.forEach((tag) => {
          if (tag.name === tagNameTrimed && tag.type === "ustensil") {
            const indexOfTags = tagsTable.indexOf(tag);
            tagsTable.splice(indexOfTags);
          }
        });
      }
      tagBtn.style.display = "none";
      ResultByTag();
    });
  });
};

// DISPLAY TAG 
listOfIngredients.addEventListener("click", (e) => {
  const tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "ingredient")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag__blue"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross_container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "ingredient" });
    ClosureOfTags();
  } else {
    console.log("doublon");
  }
  ResultByTag();
});

listOfDevices.addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "device")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag__green green"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross_container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "device" });
    ClosureOfTags();
  }
  ResultByTag();
});

listOfUstensils.addEventListener("click", (e) => {
  let tagName = e.target.textContent;
  const FoundInTable = tagsTable.filter((tag) => {
    if (tag.name === tagName && (tag.type = "ustensil")) {
      return tag;
    }
  });
  if (FoundInTable.length === 0) {
    sectiontag.innerHTML += `<button id="${tagName}" class="btntag btntag__red red"><span class="btntag--span">${tagName}</span>
          <div class="btntag__cross_container"><i class="far fa-times-circle"></i></div>
        </button>`;
    tagsTable.push({ name: tagName, type: "ustensil" });
    ClosureOfTags();
  }
  ResultByTag();
});



// PRINCIPAL SEARCH BAR 
searchbar.addEventListener("keyup", (e) => {
    const serchedLetters = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".recipe");
    filterElements(serchedLetters,cards);
});

 function filterElements(letters, elements) {
  if (letters.length >= 3) {
    clearContent();
    filteredTable = RecipeFilter(letters, recipes);
    renderRecipes(filteredTable);

    if (!filteredTable.length){
      invalidSearch()
    }
    else{
      invalidSearchInput.classList.replace('d-block', 'd-none');
    }       
  } 
  else{
    clearContent()
    invalidSearchInput.classList.replace('d-block', 'd-none');
    filteredTable = recipes;
    renderRecipes(filteredTable);
      
  }
}

// ERROR 
function invalidSearch() {
  if (recipesSection.children.length == 0) {
    invalidSearchInput.classList.replace('d-none', 'd-block');
  } else if (invalidSearchInput.classList.contains('d-block') && recipesSection.children.length != 0) {
    invalidSearchInput.classList.replace('d-block', 'd-none');
  }
}

// Effacer le contenu des recettes
function clearContent() {
  recipesSection.innerText = '';
}


