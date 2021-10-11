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
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationDocumentComponent } from './annotation-document/annotation-document.component';

@NgModule({
  declarations: [
    AppComponent,
    DomainsComponent,
    SectionedItemComponent,
    DomainToItemPipe,
    AnnotationToItemPipe,
    DomainAnnotationsComponent,
    AnnotationComponent,
    AnnotationDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    MessageModule,
    VirtualScrollerModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
