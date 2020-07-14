import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.model';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
 
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: Pokemon;
  id: string;

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.pokemonService.getPokemon(this.id)
        .subscribe(pokemonData => {
          this.pokemon = pokemonData.pokemon;
        });

    });

  }

  onDelete() {
    this.pokemonService.deletePokemon(this.pokemon);
    this.router.navigateByUrl('/pokemon');
  }

}
