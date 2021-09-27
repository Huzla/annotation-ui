import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import { AppComponent } from './app.component';
import { DomainsComponent } from './domains/domains.component';
import { SectionedItemComponent } from './sectioned-item/sectioned-item.component';
import { DomainToItemPipe } from './pipes';
import { DomainAnnotationsComponent } from './domain-annotations/domain-annotations.component';

@NgModule({
  declarations: [
    AppComponent,
    DomainsComponent,
    SectionedItemComponent,
    DomainToItemPipe,
    DomainAnnotationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
