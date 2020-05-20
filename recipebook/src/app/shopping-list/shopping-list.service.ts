
import { Ingredinet } from '../shared/ingredient.model'
export class ShoppingListService {
    ingredients: Ingredinet[] = [
        new Ingredinet('Apples', 5),
        new Ingredinet('Tomatoes', 5),
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredinet) {
        this.ingredients.push(ingredient);
      }
}