import { API_URL, KEY, RES_PER_PAGE } from "./config";
import { AJAX } from "./helpers";

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

function createRecipeObject(data){
    const {recipe} = data.data;
     return {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      ...(recipe.key && {key: recipe.key}),
    };
}

export async function loadRecipe(id){
    try {       
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

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
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key}),
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

function persistBookmarks(){
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export function addBookmark(recipe){
    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id ) state.recipe.bookmarked = true;
    persistBookmarks();
}

export function deleteBookmark(id){
    const index = state.bookmarks.findIndex(bk => bk.id === id);
    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id ) state.recipe.bookmarked = false;
    persistBookmarks();
}

export async function uploadRecipe(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
            const ingArr = ing[1].replaceAll(' ', '').split(',');
            if (ingArr.length !== 3){
                throw new Error('Wrong ingredient format! Please use the correct format ;)');
            }
    
            const [quantity, unit, description] = ingArr;
    
            return {quantity : quantity ? +quantity : null, unit , description};
        })
        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        const data = await AJAX(`${API_URL}/?key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    }
    catch(err){
        throw err;
    }
}

function init(){
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
}
init();