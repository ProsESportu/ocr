import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { DrawableDirective } from "./drawable.directive";
@NgModule({
  declarations: [
    AppComponent,
    DrawableDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
