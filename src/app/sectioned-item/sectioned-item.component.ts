import { Component, OnInit, Input } from '@angular/core';
import { SectionedItem } from '../sectioned-item';

@Component({
  selector: 'app-sectioned-item',
  templateUrl: './sectioned-item.component.html',
  styleUrls: ['./sectioned-item.component.css']
})
export class SectionedItemComponent implements OnInit {
  @Input() item?: SectionedItem;

  constructor() { }
  
  ngOnInit(): void {
  }

}
