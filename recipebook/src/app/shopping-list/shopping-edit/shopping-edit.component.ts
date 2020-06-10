import { Component, OnInit, OnDestroy} from '@angular/core';
import { Ingredinet } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingrediantAdded = new EventEmitter<Ingredinet>();

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.slService.startedEditing
   .subscribe(
     (index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
     }
   );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngrediant = new Ingredinet(value.name, value.amount);
    // this.ingrediantAdded.emit(newIngrediant);
    this.slService.addIngredient(newIngrediant);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
