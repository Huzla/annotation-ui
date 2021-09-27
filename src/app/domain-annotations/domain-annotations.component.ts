import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Domain } from '../domain';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-annotations',
  templateUrl: './domain-annotations.component.html',
  styleUrls: ['./domain-annotations.component.css']
})
export class DomainAnnotationsComponent implements OnInit {
  domain: Domain = { id: 1, name: '', index_page: '', annotations: [], groups: 0 };

  constructor(private route: ActivatedRoute, private domainService: DomainService) { }

  ngOnInit(): void {
    this.getDomain();
  }

  getDomain(): void {
    this.domainService
      .getDomainById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(domain => {
        if (domain !== null)
          this.domain = domain;
      });
  }

}
