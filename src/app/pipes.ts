import { Pipe, PipeTransform } from '@angular/core';
import { Domain } from './domain';
import { SectionedItem } from './sectioned-item';

@Pipe({ name: 'domainToItem' })
export class DomainToItemPipe implements PipeTransform {
    public transform(domain: Domain): SectionedItem {
        return {
            id: domain.id,
            badge: domain.groups,
            colorClass: (domain.groups > 0) ? 'primary' : 'secondary',
            mainContent: domain.name,
            extraContent: domain.index_page
        }
    }
}