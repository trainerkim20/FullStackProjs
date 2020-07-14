import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css']
})
export class PokemonEditComponent implements OnInit {

  pokemon: Pokemon = null;
  originalPokemon: Pokemon;
  groupPokemons: Pokemon[] = [];
  editMode: boolean = false;
  // hasGroup: boolean = false;
  id: string;
  invalidGroupPokemon: boolean;
  ngForm: FormGroup;

  constructor(private pokemonService: PokemonService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];

        if (!this.id) {
          this.editMode = false;
          return;
        }

        this.pokemonService.getPokemon(this.id)
          .subscribe( pokemonData => {
            this.originalPokemon = pokemonData.pokemon;
          });

        if (!this.originalPokemon) {
          return;
        }

        this.editMode=true;
        this.pokemon = JSON.parse(JSON.stringify(this.originalPokemon));

        // if (this.originalPokemon.group && this.originalPokemon.group.length > 0) {
        //   this.groupPokemons = JSON.parse(JSON.stringify(this.originalContact.group));
        // }

      }
    )

  }

  onSubmit(form: NgForm) {
    console.log(form);
    const value = form.value;
    const newPokemon = new Pokemon(this.id, value.name, value.nickname, value.gender, value.type, value.game, value.imageUrl);

    if(this.editMode == true) {
      this.pokemonService.updatePokemon(this.originalPokemon, newPokemon)
    } else {
      this.pokemonService.addPokemon(newPokemon);
    }
    this.router.navigate(['/pokemon']);
  }


  onCancel() {
    this.router.navigate(['/pokemon']);
  }

  isInvalidContact(newPokemon: Pokemon) {
    if(!newPokemon) {
      return true;
    }
    if (this.pokemon && newPokemon.id === this.pokemon.id) {
      return true;
    }
    for (let i = 0; i < this.groupPokemons.length; i++) {
      if (newPokemon.id === this.groupPokemons[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedPokemon: Pokemon = $event.dragData;
    this.invalidGroupPokemon = this.isInvalidContact(selectedPokemon);
    if (this.invalidGroupPokemon) {
      return;
    }
    this.groupPokemons.push(selectedPokemon);
    this.invalidGroupPokemon = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupPokemons.length)
    return;

    this.groupPokemons.splice(idx, 1);
    this.invalidGroupPokemon = false;
  }


}
