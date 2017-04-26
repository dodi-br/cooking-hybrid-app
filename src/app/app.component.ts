import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen'
import {RecipeSelectionPage} from "./pages/recipe-selection/recipe-selection.page";
import {Deeplinks} from "@ionic-native/deeplinks";
import {PlatformActions} from "./actions/platform.actions";
import {Store} from "@ngrx/store";
import {RecipeDescriptionPage} from "./pages/recipe-description/recipe-description.page";

@Component({
  template: `<ion-nav #navigation [root]="rootPage"></ion-nav>`
})
export class CookingApp {
  @ViewChild('navigation') nav: NavController;
  rootPage = RecipeSelectionPage;

  constructor(platform: Platform, store: Store<any>, platformActions: PlatformActions, splashScreen: SplashScreen, deeplinks: Deeplinks, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      store.dispatch(platformActions.ready());

      deeplinks.routeWithNavController(this.nav, {
        '/recipe/:recipeId': RecipeDescriptionPage
      });
    });
  }
}
