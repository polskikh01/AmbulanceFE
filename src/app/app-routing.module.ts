import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from "./map/map.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: '', redirectTo: '/main',  pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
