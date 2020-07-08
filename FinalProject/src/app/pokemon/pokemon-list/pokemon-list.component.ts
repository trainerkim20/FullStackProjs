import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import {PokemonService} from '../pokemon.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
private subscription: Subscription;
term: string;

// @Output() selectedContactEvent = new EventEmitter<Contact>();
  
constructor(private pkService: PokemonService) { }

  ngOnInit() {
    this.subscription = this.pkService.pokemonListChangedEvent.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      }
    );
   this.pkService.getPokemons();
  }

  onSelected(pokemon: Pokemon) {
    this.pkService.pokemonSelectedEvent.emit(pokemon);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
