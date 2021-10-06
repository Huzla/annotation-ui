import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import {ToolbarModule} from 'primeng/toolbar';
import { AppComponent } from './app.component';
import { DomainsComponent } from './domains/domains.component';
import { SectionedItemComponent } from './sectioned-item/sectioned-item.component';
import { AnnotationToItemPipe, DomainToItemPipe } from './pipes';
import { DomainAnnotationsComponent } from './domain-annotations/domain-annotations.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    DomainsComponent,
    SectionedItemComponent,
    DomainToItemPipe,
    AnnotationToItemPipe,
    DomainAnnotationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    MessageModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
