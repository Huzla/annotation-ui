import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainsComponent } from './domains/domains.component';

const routes: Routes = [
  { path: '', component: DomainsComponent, data: { heading: 'Domains' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
