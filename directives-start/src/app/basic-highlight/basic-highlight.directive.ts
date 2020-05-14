import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elementRef: ElementRef) {
        // elementRef.nativeElement
    }
    ngOnit() {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }
}