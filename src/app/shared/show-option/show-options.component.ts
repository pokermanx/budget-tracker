import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import {
    AfterViewInit,
    ApplicationRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ContentChild,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    OnDestroy,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

import { OptionsBackdropComponent } from './backdrop.component';
import { onMoveUpAnimation } from './show-options.animation';

@Directive({ selector: '[testActionItem]' })
export class ItemForActionsDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({ selector: '[testOptionsToShow]' })
export class OptionsToShowDirective {
    constructor(public template: TemplateRef<any>) { }
}

export class PositionModel {
    top: number;
    left: number;
}

@Component({
    selector: 'app-show-options',
    templateUrl: './show-options.component.html',
    styleUrls: ['./show-options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: onMoveUpAnimation()
})
export class ShowOptionsComponent implements AfterViewInit, OnDestroy {

    isOpened = false;
    hasAttachedView = false;

    _openedItemCoords: PositionModel;

    listenerClickItem: Function;
    listenerBackdrop: Function;

    _backdropCreated: any;
    _itemCreated: any;

    @ViewChild('optionsRef', { read: ElementRef }) optionsRef: ElementRef;
    @ViewChild('itemContainer', { read: ViewContainerRef }) container: ViewContainerRef;
    @ContentChild(ItemForActionsDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any>;
    @ContentChild(OptionsToShowDirective, { read: TemplateRef }) menuTemplate: TemplateRef<any>;

    constructor(
        private renderer: Renderer2,
        private _appRef: ApplicationRef,
        private _defaultInjector: Injector,
        private cfr: ComponentFactoryResolver,
        private _cdk: ChangeDetectorRef
    ) { }

    ngOnDestroy() {
        this.cleanup();
    }

    ngAfterViewInit() {
        if (this.isOpened) {
            this.optionsRef.nativeElement.style = `
                top: ${this._openedItemCoords.top}px;
                left: ${this._openedItemCoords.left}px;
            `;
        }
    }

    onItemClick() {
        this._backdropCreated = this.createBackdrop();
        this._itemCreated = this.createItemView();
        this.hasAttachedView = true;
    }

    private createBackdrop() {
        const componentRef = this.cfr.resolveComponentFactory(OptionsBackdropComponent).create(this._defaultInjector);
        this._appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        this.listenerBackdrop = this.renderer.listen(domElem, 'click', () => {
            // setTimeout(() => {
            //     this.cleanup();
            // }, 300);
            this.cleanup();
        });

        return componentRef;
    }

    private createItemView() {
        const componentRef = this.cfr.resolveComponentFactory(ShowOptionsComponent).create(this._defaultInjector);
        componentRef.instance.isOpened = true;
        componentRef.instance._openedItemCoords = this.getElemPosition(this.container.element.nativeElement);
        componentRef.instance.itemTemplate = this.itemTemplate;
        componentRef.instance.menuTemplate = this.menuTemplate;
        this._appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        this.listenerClickItem = this.renderer.listen(domElem, 'click', () => {
            // setTimeout(() => {
            //     this.cleanup();
            // }, 300);
            this.cleanup();
        });

        return componentRef;
    }

    private removeBackdrop(componentRef: ComponentRef<any>) {
        this._appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    private removeItem(componentRef: ComponentRef<any>) {
        this._appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    private cleanup(): void {
        if (this.hasAttachedView) {
            this.hasAttachedView = false;
            setTimeout(() => {
                this.removeBackdrop(this._backdropCreated);
                this.removeItem(this._itemCreated);
                this._cdk.detectChanges();
            }, 300);
        }
        if (this.listenerClickItem) {
            this.listenerClickItem();
        }
        if (this.listenerBackdrop) {
            this.listenerClickItem();
        }
        this.isOpened = false;
    }

    private getElemPosition(elem): PositionModel {
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
