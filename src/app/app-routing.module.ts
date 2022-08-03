import { NgModule } from "@angular/core";
import {
  RouterModule,
  Routes,
} from "@angular/router";
import { CalculatorComponent } from "./pages/calculator/calculator.component";

const routes: Routes = [
  {
    path: "",
    component: CalculatorComponent,
  },
  {
    path: "history",
    loadChildren: () => import("./pages/history/history.module").then(m => m.HistoryModule),
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
