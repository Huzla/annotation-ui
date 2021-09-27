import { Component, OnInit } from '@angular/core';
import { Domain } from '../domain';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
  domains: Domain[] = []
  constructor(private domainService: DomainService) { }

  ngOnInit(): void {
    this.getDomains();
  }

  private getDomains(): void {
    this.domainService.getDomains()
      .subscribe(domains => this.domains = domains);
  }


}
