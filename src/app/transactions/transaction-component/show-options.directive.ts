import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ContentChild,
    ContentChildren,
    QueryList,
    AfterViewInit,
} from '@angular/core';

@Directive({
    selector: '[appShowOption]'
})
export class ShowOptionsDirective implements AfterViewInit, OnChanges {

    currentOpen: any;
    listenerCollapse: Function;
    listenerBackdrop: Function;

    @Input() template: any;
    @Input() showAtIndex: number;
    @Output() collapseAllEvent: EventEmitter<any> = new EventEmitter();

    @ContentChildren('optionsToShow')
    protected optionsRefs: QueryList<any>;

    constructor(
        private elemntRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit() {
        this.optionsRefs.forEach(el => {
            el.nativeElement.style = 'display: none';
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.showAtIndex.currentValue) {
            this.currentOpen = changes.showAtIndex.currentValue.id;
            this.collapseAll();
            const child = this.elemntRef.nativeElement.children[this.currentOpen];
            this.createTRansitionTile(child);
        }
    }

    createTRansitionTile(child) {
        const transitionTile = child.cloneNode(true);
        child.style = 'visibility: hidden';
        const backdrop = document.createElement('div');
        backdrop.className = 'fade-body-backdrop';
        backdrop.id = 'backdrop-fade';
        const coords = this.getCoords(child);
        transitionTile.className = 'options-slide';
        transitionTile.style = `
                top: ${coords.top}px;
                left: ${coords.left}px
            `;
        const options = this.optionsRefs.toArray()[this.currentOpen].nativeElement;
        options.id = 'options-block';
        options.style = 'display: block';
        this.renderer.appendChild(transitionTile, options);
        this.renderer.appendChild(backdrop, transitionTile);
        this.renderer.appendChild(document.body, backdrop);
        this.listenerCollapse = this.renderer.listen(transitionTile, 'click', () => {
            this.currentOpen = null;
            this.collapseAllEvent.emit();
            this.collapseAll();
        });
        this.listenerBackdrop = this.renderer.listen(backdrop, 'click', () => {
            this.currentOpen = null;
            this.collapseAllEvent.emit();
            this.collapseAll();
        });
        transitionTile.classList.toggle('options-slide--slider');
    }

    collapseAll() {
        for (const el of this.elemntRef.nativeElement.children) {
            el.style = 'transform: none';
            this.cleanupEmbed();
        }
        if (this.listenerBackdrop) {
            this.listenerCollapse();
            this.listenerBackdrop();
        }
    }

    cleanupEmbed() {
        const backdrop = document.getElementById('backdrop-fade');
        if (backdrop) {
            this.renderer.removeChild(document.body, backdrop);
        }
    }

    getCoords(elem) {
        const box = elem.getBoundingClientRect();

        const body = document.body;
        const docEl = document.documentElement;

        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        const clientTop = docEl.clientTop || body.clientTop || 0;
        const clientLeft = docEl.clientLeft || body.clientLeft || 0;

        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }
}
