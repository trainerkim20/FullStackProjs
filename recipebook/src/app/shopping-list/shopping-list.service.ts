import { EventEmitter } from '@angular/core';
import { Ingredinet } from '../shared/ingredient.model';

export class ShoppingListService {
ingredientsChanged = new EventEmitter<Ingredinet[]>();
    private ingredients: Ingredinet[] = [
        new Ingredinet('Apples', 5),
        new Ingredinet('Tomatoes', 5),
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredinet) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
}