import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Recipe} from "../models/Recipe";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {Configuration} from "../app.configuration";

@Injectable()
export class RecipeService {
  private headers: Headers;

  constructor(private $http: Http, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  getDailyRecipes() : Observable<Recipe[]> {
    return this.$http.get(this.configuration.serverUrl + "recipe/daily-recipes.json", {'headers': this.headers})
      .map((r: Response) => <Recipe[]>r.json());
  }
}
