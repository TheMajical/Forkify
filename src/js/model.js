export const state = {
    recipe: {},
};

export async function loadRecipe(id){
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();

        if(!res.ok) throw new Error(`Wrong URL Id - ${res.status}`);
        console.log(res, data);

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

    }
    catch(err){
        alert(`${err.message}`);
    }
}