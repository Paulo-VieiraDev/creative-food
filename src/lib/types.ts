export interface IngredientMeasure {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  instructions?: string;
  ingredientsWithMeasures?: IngredientMeasure[];
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'bot';
  text: string;
  recipes?: Recipe[];
}