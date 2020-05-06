import { Component, OnInit, Input, ViewEncapsulation, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, OnDestory } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'], 
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, OnDestory {
  @Input() element: {type: string, name: string, content: string};
  @Input() name: string;

  constructor() { 
    console.log('constructor called!');
  }

  ngOnChanges() {
console.log('ngOnChanges called!')
console.log(changes);
  }

  ngOnInit() {
    console.log('ngOnInit called!');
  }

  ngDoCheck() {
    console.log('Do Check called!');
  }

  ngAfterContentInit() {
    console.log('AfterContent called!');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked called!');
  }

  ngOnDestory() {
    console.log('OnDestory called!');
  }

}
