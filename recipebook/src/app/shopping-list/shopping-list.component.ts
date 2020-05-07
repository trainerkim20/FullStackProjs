import { Component, OnInit } from '@angular/core';

import { Ingredinet } from '../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredinet[] = [
    new Ingredinet('Apples', 5),
    new Ingredinet('Tomatoes', 5),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onIngrediantAdded(ingredient: Ingredinet) {
    this.ingredients.push(ingredient);
  }

}
