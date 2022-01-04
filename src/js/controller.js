import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

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

    bookmarksView.update(model.state.bookmarks);
    // 1) loading recipe
    await model.loadRecipe(id);
    // 2) Rendering recipe
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

function controlBookmarks(){
  // 1) Add/remove bookmarks
  if(model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id)
  else model.addBookmark(model.state.recipe);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function firstBookmarkControl(){
  bookmarksView.render(model.state.bookmarks);
}

function controlAddRecipe(newRecipe){
  console.log(newRecipe);
  //Upload the new recipe data
  
}

function init(){
  bookmarksView.addHandlerRender(firstBookmarkControl);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();