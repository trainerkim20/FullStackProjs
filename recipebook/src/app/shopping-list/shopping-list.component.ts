import { Component, OnInit } from '@angular/core';

import { Ingredinet } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredinet[];

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
  }

  // onIngrediantAdded(ingredient: Ingredinet) {
  //   this.ingredients.push(ingredient);
  // }

}
