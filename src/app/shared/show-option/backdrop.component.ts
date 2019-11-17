import { Component, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-options-backdrop',
    styleUrls: ['./show-options.component.scss'],
    template: ` `
})
export class OptionsBackdropComponent implements OnInit {

    protected _isShown = false;

    get isShown(): boolean {
        return this._isShown;
    }

    set isShown(value: boolean) {
        this._isShown = value;
        if (value) {
            this.renderer.addClass(
                this.element.nativeElement,
                'show-backdrop'
            );
        } else {
            this.renderer.removeClass(
                this.element.nativeElement,
                'hide-backdrop'
            );
        }
    }

    _element: ElementRef;
    _renderer: Renderer2;

    @HostBinding('class') hostClass = 'fade-body-backdrop';

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
    ) {
        this._element = element;
        this._renderer = renderer;
    }

    ngOnInit() {
        this.isShown = true;
    }
}

