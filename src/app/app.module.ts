import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CookingApp } from './app.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import {ScreenService} from "./services/screen-service";
import {RecipeService} from "./services/recipe-service";
import {Configuration} from "./app.configuration";
import {TimerComponent} from "./pages/steps/timer/timer.component";
import {StepComponent} from "./pages/steps/step/step.component";
import {RecipeCompletedPage} from "./pages/recipe-completed/recipe-completed.page";
import {WindowRef} from "./services/window-ref";
import {RecipeSelectionPage} from "./pages/recipe-selection/recipe-selection.page";
import {RecipeDetailPage} from "./pages/recipe-detail/recipe-detail.page";
import {ValuesPipe} from "./pages/recipe-detail/values.pipe";
import {RunningTimersPipe} from "./pages/steps/running-timers.pipe";
import {RootStepsPage} from "./pages/steps/root-steps.page";
import {TimerStepsPage} from "./pages/steps/timer-steps.page";
import {StoreModule} from '@ngrx/store';
import {recipesReducer} from "./reducers/recipes.reducer";
import {RecipesActions} from "./actions/recipes.actions";
import {SelectedRecipeActions} from "./actions/selectedRecipe.actions";
import {selectedRecipeReducer} from "./reducers/selectedRecipe.reducer";

@NgModule({
  declarations: [
    CookingApp,
    RecipeSelectionPage,
    RecipeDetailPage,
    RootStepsPage,
    TimerStepsPage,
    RecipeCompletedPage,
    IngredientComponent,
    TimerComponent,
    StepComponent,
    ValuesPipe,
    RunningTimersPipe
  ],
  imports: [
    IonicModule.forRoot(CookingApp),
    StoreModule.provideStore({ recipes: recipesReducer, selectedRecipe: selectedRecipeReducer })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CookingApp,
    RecipeSelectionPage,
    RecipeDetailPage,
    RootStepsPage,
    TimerStepsPage,
    RecipeCompletedPage
  ],
  providers: [
    ScreenService,
    RecipeService,
    Configuration,
    WindowRef,
    RecipesActions,
    SelectedRecipeActions
  ]
})
export class AppModule {}
