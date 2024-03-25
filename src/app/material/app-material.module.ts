import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";

const materialModules = [
  MatToolbarModule,
  MatButton,
  MatProgressSpinner,
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatDivider,
  MatCardActions,
  MatCardTitle,
  MatCardSubtitle
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, materialModules
  ],
  exports: [
    materialModules
  ]
})
export class AppMaterialModule {
}
