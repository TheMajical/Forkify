import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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
    recipeView.renderError();
  }
}

async function controlSearchResults(){
  try{
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);

    //3) Render search results
    resultsView.render(model.getSearchResultsPage());

  }
  catch(err){
    console.log(err.message);
  }
}

function init(){
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}

init();