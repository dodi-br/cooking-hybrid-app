import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {CookingApp} from "./app.component";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {ScreenService} from "./services/screen-service";
import {RecipeService} from "./services/recipe-service";
import {Configuration} from "./app.configuration";
import {StepComponent} from "./pages/steps2/step/step.component";
import {RecipeCompletedPage} from "./pages/recipe-completed/recipe-completed.page";
import {WindowRef} from "./services/window-ref";
import {RecipeSelectionPage} from "./pages/recipe-selection/recipe-selection.page";
import {RecipeDetailPage} from "./pages/recipe-detail/recipe-detail.page";
import {ValuesPipe} from "./pages/recipe-detail/values.pipe";
import {StepsPage} from "./pages/steps2/steps.page";
import {StoreModule} from "@ngrx/store";
import {recipesReducer} from "./reducers/recipes.reducer";
import {RecipesActions} from "./actions/recipes.actions";
import {SelectedRecipeActions} from "./actions/selectedRecipe.actions";
import {selectedRecipeReducer} from "./reducers/selectedRecipe.reducer";
import {StepsService} from "./pages/steps2/steps.service";
import {StepsActions} from "./actions/steps.actions";
import {stepsReducer} from "./reducers/steps.reducer";
import {timersReducer} from "./reducers/timers.reducer";
import {TimersService} from "./pages/steps2/timers.service";
import {TimersActions} from "./actions/timers.actions";
import {StepsEffects} from "./effects/steps.effects";
import {TimerComponent} from "./pages/steps2/timer/timer.component";
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [
    CookingApp,
    RecipeSelectionPage,
    RecipeDetailPage,
    RecipeCompletedPage,
    StepsPage,
    IngredientComponent,
    StepComponent,
    TimerComponent,
    ValuesPipe
  ],
  imports: [
    IonicModule.forRoot(CookingApp),
    StoreModule.provideStore({
      recipes: recipesReducer,
      selectedRecipe: selectedRecipeReducer,
      steps: stepsReducer,
      timers: timersReducer
    }),
    EffectsModule.run(StepsEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CookingApp,
    RecipeSelectionPage,
    RecipeDetailPage,
    RecipeCompletedPage,
    StepsPage
  ],
  providers: [
    ScreenService,
    RecipeService,
    Configuration,
    WindowRef,
    RecipesActions,
    SelectedRecipeActions,
    StepsService,
    StepsActions,
    TimersService,
    TimersActions
  ]
})
export class AppModule {}
