import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: []
};

export async function loadRecipe(id){
    try {       
        const data = await getJSON(`${API_URL}/${id}`);

        const {recipe} = data.data;

        state.recipe = {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }

        if(state.bookmarks.some(bookmark => bookmark.id === id))
            state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false; 
    }
    catch(err){
        throw err;
    }
}

export async function loadSearchResults(query){
    try {
        state.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })

    }
    catch(err){
        throw err;
    }
}

export function getSearchResultsPage(page = state.search.page){
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}

export function updateServings(newServings){
    state.recipe.ingredients.forEach(ing => {
       ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

export function addBookmark(recipe){
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id ) state.recipe.bookmarked = true;
}

export function deleteBookmark(id){
    const index = state.bookmarks.findIndex(bk => bk.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id ) state.recipe.bookmarked = false;
}