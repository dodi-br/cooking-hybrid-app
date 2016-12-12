import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Recipe} from "../models/Recipe";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Configuration} from "../app.configuration";
import {Store} from "@ngrx/store";
import {AppStore} from "../app.store";

@Injectable()
export class RecipeService {
  private headers: Headers;
  recipes: Observable<Recipe[]>;

  constructor(private $http: Http, private configuration: Configuration, private store: Store<AppStore>) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.recipes = store.select('recipes') as Observable<Recipe[]>;

    this.loadRecipes();
  }

  private loadRecipes() {
    this.$http.get(this.configuration.serverUrl + "recipe/daily-recipes.json", {'headers': this.headers})
      .map((r: Response) => <Recipe[]>r.json())
      .map(payload => ({ type: 'LOAD', payload }))
      .subscribe(action => this.store.dispatch(action));
  }
}
