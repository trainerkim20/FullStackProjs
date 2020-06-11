import { Recipe } from './recipe.mode';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredinet } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Schnitzel', 'Awesome', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg', 
        [
            new Ingredinet('Meat', 1),
            new Ingredinet('French Fries', 20),

        ]),
        new Recipe('Burger', 'Greasy', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg', 
        [
            new Ingredinet('Buns', 2),
            new Ingredinet('Meat', 1),
        ]),
      ];

      constructor(private slService: ShoppingListService) {

      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredinet[]) {
            this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
}