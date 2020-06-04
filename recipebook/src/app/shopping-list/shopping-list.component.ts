import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredinet } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredinet[];
  private igChangeSub: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
   this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredinet[]) => {
        this.ingredients = ingredients;
      }
      );
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  // onIngrediantAdded(ingredient: Ingredinet) {
  //   this.ingredients.push(ingredient);
  // }

}
