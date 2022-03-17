 function renderRecipes (recipeTable)  {
    //  DOM 
    const recipesSection = document.getElementById("main-section");
    let listOfIngredients = document.getElementById("ingredientsList");
    let listOfDevices = document.getElementById("devicesList");
    let listOfUstensils = document.getElementById("ustensilsList");

    const chevronUpGreen = document.getElementById("chevron-up-green");
    const chevronUpRed = document.getElementById("chevron-up-red");
    const chevronUpBlue = document.getElementById("chevron-up-blue");
    const chevronDownBlue = document.getElementById("chevron-down-blue");
    const chevronDownGreen = document.getElementById("chevron-down-green");
    const chevronDownRed = document.getElementById("chevron-down-red");

    const listIngredients = document.getElementById("list__blue");
    const listDevices = document.getElementById("list__green");
    const listUstensils = document.getElementById("list__red");
    const inputIngredients = document.getElementById("search_ingredients");
    const inputDevices = document.getElementById("search_devices");
    const inputUstensils = document.getElementById("search_ustensils");

    const titleIngredients = document.getElementById("btn-ingredient-text");
    const titleDevices = document.getElementById("btn-device-text");
    const titleUstensils = document.getElementById("btn-ustensil-text");

    recipesSection.innerHTML = "";
    // DISPLAY RECIPE 
    recipeTable.forEach((recipe) => {
      recipesSection.innerHTML += `<article class="recipe">
      <div class="article_box">
        <div class="card_img"></div>
          <div class="txt_container">
            <div class="title_time">
              <h3 class="title_name">${recipe.name}</h3>
              <span>
                <img src="./img/time.svg" alt="icon de l'horloge" aria-label="menu des ingrédients">
                <h3>${recipe.time} </h3>
              </span>
            </div>
  
            <div class="txt_box">
              <div class="txt_items">
                <nav class="ingridients_list" >
                  <ul>
                    <li>${setIngredients(recipe.ingredients)}</li>
                  </ul>
                </nav>
              </div>
  
              <div class="txt_items">
               <p class="description">${recipe.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </artcile>`;
  });
  
  function setIngredients(ingredients) {
      let html = '';
      for (const ingredient of ingredients) {
        html += '<p>' + ingredient.ingredient;
        if (ingredient.quantity) html += ' : ' + ingredient.quantity;
        if (ingredient.unit) html += '' + ingredient.unit;
        html += '</p>';
      }
      return html;
    }
  
    // GET INGREDIENTS FOR EACH RECIPE
    const ingredientTables = recipeTable.map((r) => {
      return r.ingredients.map((i) => {
        if (i.quantity === undefined) {
          return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}</li>`;
        } else if (i.unit === undefined) {
          return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}: ${
            i.quantity
          }</li>`;
        } else {
          return `<li>${i.ingredient.replace(/ *\([^)]*\) */g, "")}: ${
            i.quantity
          }${i.unit}</li>`;
        }
      });
    });
  
    // INJECT INGREDIENTS
    const ingredientsLists = document.getElementsByClassName(
      "recipe__description__details_container__ingredients"
    );
    ingredientsLists.innerHTML = "";
  
    for (let i = 0; i < ingredientsLists.length; i++) {
      ingredientsLists[i].innerHTML += ingredientTables[i].join("");
    }
  
    // GET INGREDIENT
    const getIngredient = () => {
      const allIngredientsTable = [];
  
      const ingredientsByRecipeTable = recipeTable.map((element) => {
        return element.ingredients.map((i) => {
          return i.ingredient.replace(/ *\([^)]*\) */g, "");
        });
      });
  
      ingredientsByRecipeTable.forEach((element) => {
        element.forEach((i) => {
          allIngredientsTable.push(i);
        });
      });
      let ingretiensToLowerCase = allIngredientsTable.map((i) => {
        return i.toLowerCase();
      });
  
      const ingredientsArray = [...new Set(ingretiensToLowerCase)];
      const ingredients = ingredientsArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      return ingredients;
    };
  
    getIngredient();
    listOfIngredients.innerHTML = "";
    getIngredient().forEach((i) => {
      listOfIngredients.innerHTML += `<li class=ingredient>${i}</li>`;
    });
  
    // GET DEVICES
    const getDevices = () => {
      const allDevicesTable = [];
  
      const devicesByRecipeTable = recipeTable.map((element) => {
        return element.appliance;
      });
  
      devicesByRecipeTable.forEach((element) => {
        return allDevicesTable.push(element);
      });
      let devicesToLowerCase = allDevicesTable.map((i) => {
        return i.toLowerCase();
      });

      const devicesArray = [...new Set(devicesToLowerCase)];
      const devices = devicesArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      return devices;
    };
  
    getDevices();
    listOfDevices.innerHTML = "";
    getDevices().forEach((i) => {
      listOfDevices.innerHTML += `<li class=device>${i}</li>`;
    });

    // GET USTENSILS 
    const getUstensils = () => {
      const allUstensilsTable = [];
  
      const ustensilsByRecipeTable = recipeTable.map((element) => {
        return element.ustensils;
      });
  
      ustensilsByRecipeTable.forEach((element) => {
        return element.forEach((u) => {
          return allUstensilsTable.push(u.replace(/ *\([^)]*\) */g, ""));
        });
      });
  
      let ustensilsToLowerCase = allUstensilsTable.map((i) => {
        return i.toLowerCase();
      });

      const ustensilsArray = [...new Set(ustensilsToLowerCase)];
      const ustensils = ustensilsArray.map((i) => {
        return i.charAt(0).toUpperCase() + i.slice(1);
      });
      return ustensils;
    };
    getUstensils();
    listOfUstensils.innerHTML = "";
    getUstensils().forEach((i) => {
      listOfUstensils.innerHTML += `<li class=ustensil>${i}</li>`;
    });
  
   // CKICK LIST DOWN 
   const clickOnChevron = (chevronUp, chevronDown, input, list,title) => {
      chevronDown.addEventListener("click", () => {
        chevronUp.style.display = "flex";
        list.style.display = "flex";
        chevronDown.style.display = "none";
        input.style.display = "flex";
        title.style.display = "none";
      });
    
      chevronUp.addEventListener("click", () => {
        chevronDown.style.display = "flex";
        list.style.display = "none";
        chevronUp.style.display = "none";
        input.style.display = "none";
        title.style.display = "flex";
      });
    };
    
    clickOnChevron(
      chevronUpBlue,
      chevronDownBlue,
      inputIngredients,
      listIngredients,
      titleIngredients
    );
    clickOnChevron(
      chevronUpGreen,
      chevronDownGreen,
      inputDevices,
      listDevices,
      titleDevices
    );
    clickOnChevron(
      chevronUpRed,
      chevronDownRed,
      inputUstensils,
      listUstensils,
      titleUstensils
    );

    // MATCH BETWEEN A WORD AND CHARACTER STRING 
    const matchInput = (string, inputword) => {
        return string.toLowerCase().match(inputword.toLowerCase()) ? true : false;
    };
  
  //GET INGRIDIENT ON TAPE 
  const FilterIngredientsList = (recipeTable) => {
    let ingredientWord = "";
    let ingredientArray = [];
    let ingredientList = document.getElementsByClassName("list__blue__ul")[0];

    inputIngredients.addEventListener("input", () => {
      if (inputIngredients.value.length >= 1) {
        const ingredientTables = recipeTable.map((r) => {
          return r.ingredients.map((i) => {
            return i.ingredient;
          });
        });
        ingredientTables.forEach((table) => {
          table.forEach((i) => {
            ingredientArray.push(i.toLowerCase());
          });
        });
        const firstUppercaseLetter = ingredientArray.map((i) => {
          return i.charAt(0).toUpperCase() + i.slice(1);
        });
        // DUPLICATES REMOVE
        const ingredients = [...new Set(firstUppercaseLetter)];
        ingredientWord = inputIngredients.value.toLowerCase();
        const matchsearcharray = ingredients.filter((i) => {
          if (matchInput(i, ingredientWord)) {
            return i;
          }
        });

          ingredientList.innerHTML = "";
        matchsearcharray.forEach((i) => {
            ingredientList.innerHTML += `<li class="ingredient">${i}</li>`;
        });
      }
    });
  };

  //GET DEVICE ON TAPE 
  const FilterDevicesList = (recipeTable) => {
    let deviceWord = "";
    let deviceArray = [];
    let deviceList = document.getElementsByClassName("list__green__ul")[0];
    inputDevices.addEventListener("input", () => {
      if (inputDevices.value.length >= 1) {
        const deviceTables = recipeTable.map((r) => {
          return r.appliance;
        });
        deviceTables.forEach((device) => {
            deviceArray.push(device.toLowerCase());
        });
        const firstUppercaseLetter = deviceArray.map((i) => {
          return i.charAt(0).toUpperCase() + i.slice(1);
        });
        // DUPLICATES REMOVE
        const devices = [...new Set(firstUppercaseLetter)];
        deviceWord = inputDevices.value.toLowerCase();
        const matchsearcharray = devices.filter((i) => {
          if (matchInput(i, deviceWord)) {
            return i;
          }
        });

        deviceList.innerHTML = "";
        matchsearcharray.forEach((i) => {
            deviceList.innerHTML += `<li class="device">${i}</li>`;
        });
      }
    });
  };

  //GET USTENSILS ON TAPE 
    const FilterUstensilsList = (recipeTable) => {
    let ustensilWord = "";
    let ustensilArray = [];
    let ustensilList = document.getElementsByClassName("list__red__ul")[0];

    inputUstensils.addEventListener("input", () => {
      if (inputUstensils.value.length >= 1) {
        const ustensilTables = recipeTable.map((r) => {
          return r.ustensils;
        });
        ustensilTables.forEach((ustensil) => {
          ustensil.forEach((u) => {
            ustensilArray.push(u.toLowerCase());
          });
        });
        const firstUppercaseLetter = ustensilArray.map((i) => {
          return i.charAt(0).toUpperCase() + i.slice(1);
        });
        // DUPLICATES REMOVE
        const ustensils = [...new Set(firstUppercaseLetter)];
        ustensilWord = inputUstensils.value.toLowerCase();
        const matchsearcharray = ustensils.filter((i) => {
          if (matchInput(i, ustensilWord)) {
            return i;
          }
        });
          ustensilList.innerHTML = "";
        matchsearcharray.forEach((i) => {
            ustensilList.innerHTML += `<li class="ustensil">${i}</li>`;
        });
      }
    });
  };

  FilterIngredientsList(recipeTable);
  FilterDevicesList(recipeTable);
  FilterUstensilsList(recipeTable);

  return recipeTable;
  
};
  export default renderRecipes;
