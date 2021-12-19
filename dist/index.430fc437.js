const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
if (module.hot) module.hot.accept();
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
async function showRecipe() {
    try {
        // 1) Loading data from API
        const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
        const data = await res.json();
        if (!res.ok) throw new Error(`Wrong URL Id - ${res.status}`);
        console.log(res, data);
        let { recipe  } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        // 2) Rendering data into HTML
        const markup = `
    
    `;
    } catch (err) {
        alert(`${err.message}`);
    }
}
showRecipe();

//# sourceMappingURL=index.430fc437.js.map
