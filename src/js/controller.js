import * as model from './model.js'
import recipeView from './views/recipeView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
async function controlRecipe(){
  try{
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);

    if (!id) return;

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  }
  catch(err){
    alert(`${err.message}`);
  }
}

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));