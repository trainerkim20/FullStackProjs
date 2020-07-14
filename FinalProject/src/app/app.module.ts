import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { PokemonItemComponent } from './pokemon/pokemon-item/pokemon-item.component';
import { PokemonEditComponent } from './pokemon-edit/pokemon-edit.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonComponent,
    PokemonItemComponent,
    PokemonEditComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
