import { Injectable, EventEmitter } from '@angular/core';
import { Pokemon } from "./pokemon.model";
import { Subject } from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  pokemonListChangedEvent = new Subject<Pokemon[]>();

  pokemonSelectedEvent = new EventEmitter<Pokemon>();

  // contactChangedEvent = new EventEmitter<Contact[]>();

  pokemons: Pokemon[] = [];

  // maxContactId: number;
//   
  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
   }

   sortAndSend() {
    this.pokemons.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.pokemonListChangedEvent.next(this.pokemons.slice());
   }

   addPokemon(newPokemon: Pokemon) {
     if (!newPokemon) {
       return;
     }
    //  this.maxContactId++;
    newPokemon.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{message: string, pokemon: Pokemon}>('http://localhost:3000/pokemon/', 
    newPokemon, {headers: headers})
    .subscribe(
      (responseData) => {
        this.pokemons.push(responseData.pokemon);
        this.sortAndSend();
      });

    //  newContact.id = this.maxContactId.toString();

    //  this.contacts.push(newContact);

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.storeContacts();
   }

    deletePokemon(pokemon: Pokemon) {
    if (!pokemon) {
      return;
    }

    const pos = this.pokemons.findIndex(c => c.id === pokemon.id);
    if(pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/pokemon/' + pokemon.id)
    .subscribe(
      (response: Response) => {
        this.pokemons.splice(pos, 1);
        this.sortAndSend();
      }
    );

    // this.contacts.splice(pos, 1);
    // const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.contactChangedEvent.emit(this.contacts.slice());
    // this. storeContacts();
  }

   getPokemons() {
    //  return this.contacts.slice();
    this.http.get<{message: string, pokemons: Pokemon[]}>('http://localhost:3000/pokemon/')
    .subscribe(
      (responseData) => {
        this.pokemons = responseData.pokemons;
        this.sortAndSend();

        // this.maxContactId = this.getMaxId();

        
      },
      (error: any) => {
        console.log(error);
      }
    )
   }

   getPokemon(id: string) {
    return this.http.get<{message: string, pokemon: Pokemon}>('http://localhost:3000/pokemon/' + id);
    //  .subscribe(
    //    (responseData) => {
    //      this.contacts = responseData.contacts;
    //      this.sortAndSend();
    //    }
    //  );
    //  for(const contact of this.contacts) {
    //    if(contact.id === id) {
    //      return contact;
    //    }
    //  }
    //  return null;
   }

//    getMaxId(): number {
//     let maxId = 0;

//     for (const contact of this.contacts) {
//       let currentId = parseInt(contact.id);

//       if (currentId > maxId) {
//         maxId = currentId;
//       }
//     }
//     return maxId;
//    }

   updatePokemon(originalPokemon: Pokemon, newPokemon: Pokemon) {
     if (!originalPokemon || !newPokemon) {
       return;
     }

     const pos = this.pokemons.findIndex(c => c.id === originalPokemon.id);

     if(pos < 0) {
       return;
     }

     newPokemon.id = originalPokemon.id;

     const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //  const strContact = JSON.stringify(newContact);

     this.http.put('http://localhost:3000/pokemon/' + originalPokemon.id
     , newPokemon, {headers: headers})
     .subscribe(
      (response: Response) => {
        this.pokemons[pos] = newPokemon;
        this.sortAndSend();
      }
       );

    //  this.contacts[pos] = newContact;

    //  const contactListClone = this.contacts.slice();

    //  this.contactListChangedEvent.next(contactListClone);
    // this.storeContacts();

   }

  //  storePokemons() {
  //   let contacts = JSON.stringify(this.pokemons);

  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});

  //   this.http.put('https://rkjcms-54e6b.firebaseio.com/contacts.json', this.pokemons, {headers: headers})
  //   .subscribe(
  //     () => {
  //       this.pokemonListChangedEvent.next(this.pokemons.slice());
  //     }
  //   );
  // }
}