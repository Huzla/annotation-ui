import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainAnnotationsComponent } from './domain-annotations/domain-annotations.component';
import { DomainsComponent } from './domains/domains.component';

const routes: Routes = [
  { path: '', component: DomainsComponent, data: { heading: 'Domains' }},
  { path: 'domains/:id', component: DomainAnnotationsComponent, data: { heading: 'Domain annotations' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
