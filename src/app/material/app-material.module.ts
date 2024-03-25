import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";

const materialModules = [
  MatToolbarModule,
  MatButton
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
