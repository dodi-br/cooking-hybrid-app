import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CookingApp } from './app.component';
import { IngredientComponent } from './pages/recipe-detail/ingredient/ingredient.component';
import {ScreenService} from "./services/screen-service";
import {RecipeService} from "./services/recipe-service";
import {Configuration} from "./app.configuration";
import {TimerComponent} from "./pages/steps/timer/timer.component";
import {StepComponent} from "./pages/steps/step/step.component";
import {RecipeCompletedPage} from "./pages/recipe-completed/recipe-completed.page";
import {WindowRef} from "./services/window-ref";
import {RootStepsPage, TimerStepsPage} from "./pages/steps/steps.page";
import {RecipeSelectionPage} from "./pages/recipe-selection/recipe-selection.page";
import {RecipeDetailPage} from "./pages/recipe-detail/recipe-detail.page";

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
    StepComponent
  ],
  imports: [
    IonicModule.forRoot(CookingApp)
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
    WindowRef
  ]
})
export class AppModule {}
