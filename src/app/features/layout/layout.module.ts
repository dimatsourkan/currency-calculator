import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
})
export class LayoutModule {}
