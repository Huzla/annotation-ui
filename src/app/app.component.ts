import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'annotator';
  heading = 'You are lost!';

  constructor(private primengConfig: PrimeNGConfig, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized && data.state.root.firstChild !== null)
        this.heading = data.state.root.firstChild.data.heading;
    });
  }
}
