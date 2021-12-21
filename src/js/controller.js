import * as model from './model.js'
import recipeView from './views/recipeView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

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
    console.error(`${err.message}`);
  }
}

function init(){
  recipeView.addHandlerRender(controlRecipe);
}

init();