import { EventEmitter } from '@angular/core';
import { Ingredinet } from '../shared/ingredient.model';
import { Subject } from 'rxjs'
 
export class ShoppingListService {
ingredientsChanged = new Subject<Ingredinet[]>();
startedEditing = new Subject<number>();
    private ingredients: Ingredinet[] = [
        new Ingredinet('Apples', 5),
        new Ingredinet('Tomatoes', 5),
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredinet) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredinet[]) {
        //   for(let ingredient of ingredients) {
        //       this.addIngredient(ingredient);
        //   }
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredinet) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}