import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expensive',
  templateUrl: './expensive.component.html',
  styleUrls: ['./expensive.component.scss']
})
/**
 * This component blocks synchronously for a specific
 * period of time.
 */
export class ExpensiveComponent implements OnInit {
  @Input() nestingLevel = 0;

  readonly waitForMs = 2000;

  constructor() {
    console.log('🚨️ expensive component: constructor');
    this.blockSync();
  }

  ngOnInit() {
    console.log('🚨️ expensive component: ngOnInit');
  }

  private blockSync() {
    const now = new Date().getTime();
    while (true) {
      const elapsed = new Date().getTime() - now;
      if ((elapsed) > this.waitForMs) {
        break;
      }
    }
  }
}
