import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const recipeContainer = document.querySelector('.recipe');

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
async function controlRecipe(){
  try{
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // 0) upate resutls view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

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
    resultsView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

  }
  catch(err){
    console.log(err.message);
  }
}

function controlPagination(gotoPage){
  // 1) Render NEW search results
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // 2) Render NEW pagination buttons
  paginationView.render(model.state.search);
}

function controlServings(servingNumber){
  //update the recipe servings in state
  model.updateServings(servingNumber);
  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function init(){
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();