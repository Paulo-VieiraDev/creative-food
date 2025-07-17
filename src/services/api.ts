import type { Recipe, IngredientMeasure } from '../lib/types';

interface MealDBRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | null;
}

export const fetchAllIngredientsList = async (): Promise<string[]> => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const data = await response.json();
        return data.meals ? data.meals.map((item: { strIngredient: string }) => item.strIngredient) : [];
    } catch (error) {
        console.error("Falha ao buscar a lista de ingredientes:", error);
        return [];
    }
}

export const fetchRecipeDetails = async (id: string): Promise<Recipe | null> => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    if (!data.meals) return null;

    const fullRecipe: MealDBRecipe = data.meals[0];
    const ingredientsWithMeasures: IngredientMeasure[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredientName = fullRecipe[`strIngredient${i}`];
      if (ingredientName && ingredientName.trim() !== '') {
        ingredientsWithMeasures.push({
          ingredient: ingredientName,
          measure: fullRecipe[`strMeasure${i}`] || '',
        });
      }
    }

    return {
      id: fullRecipe.idMeal,
      name: fullRecipe.strMeal,
      imageUrl: fullRecipe.strMealThumb,
      instructions: fullRecipe.strInstructions,
      ingredientsWithMeasures: ingredientsWithMeasures,
    };
  } catch (error) {
    console.error(`Falha ao buscar detalhes da receita ${id}:`, error);
    return null;
  }
};

export const fetchRecipesByIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  if (ingredients.length === 0) return [];

  try {
    const searchPromises = ingredients.map(ing =>
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        .then(res => res.json())
        .then(data => data.meals ? data.meals.map((meal: { idMeal: string }) => meal.idMeal) : [])
    );

    const recipeIdLists = await Promise.all(searchPromises);
    if (recipeIdLists.some(list => list.length === 0)) return [];

    const commonRecipeIds = recipeIdLists.reduce((a, b) => a.filter((c: string) => b.includes(c)));
    if (commonRecipeIds.length === 0) return [];

    const detailPromises = commonRecipeIds.slice(0, 5).map((id: string) => fetchRecipeDetails(id));
    const detailedRecipes = await Promise.all(detailPromises);

    return detailedRecipes.filter(recipe => recipe !== null) as Recipe[];
  } catch (error) {
    console.error("Erro ao buscar receitas na API:", error);
    return [];
  }
};