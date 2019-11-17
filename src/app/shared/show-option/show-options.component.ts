import {
    ApplicationRef,
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ContentChild,
    Directive,
    ElementRef,
    EmbeddedViewRef,
    Injector,
    Input,
    OnDestroy,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

import { OptionsBackdropComponent } from './backdrop.component';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowOptionsComponent implements OnDestroy {

    isOpened = false;
    listenerClickItem: Function;
    listenerBackdrop: Function;

    _backdropCreated: any;
    _itemCreated: any;

    @Input() template: any;
    @Input() showAtIndex: number;
    // @Output() collapseAllEvent: EventEmitter<any> = new EventEmitter();

    @ViewChild('itemContainer', { read: ViewContainerRef }) container: ViewContainerRef;
    @ContentChild(ItemForActionsDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any>;
    @ContentChild(OptionsToShowDirective, { read: TemplateRef }) menuTemplate: TemplateRef<any>;

    constructor(
        private renderer: Renderer2,
        private _appRef: ApplicationRef,
        private _defaultInjector: Injector,
        private _viewRef: ViewContainerRef,
        private cfr: ComponentFactoryResolver,
    ) { }

    ngOnDestroy() {
        this.cleanup();
    }

    onItemClick() {
        console.log(this._viewRef)
        if (this.isOpened) {
            this.removeBackdrop(this._backdropCreated);
        } else {
            this._backdropCreated = this.createBackdrop();
            this._itemCreated = this.createItemView();
        }
        this.isOpened = !this.isOpened;
    }

    private createBackdrop() {
        const componentRef = this.cfr.resolveComponentFactory(OptionsBackdropComponent).create(this._defaultInjector);
        console.log(componentRef)
        this._appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        document.body.appendChild(domElem);

        this.listenerBackdrop = this.renderer.listen(domElem, 'click', () => {
            this.cleanup();
            this.isOpened = false;
            this.removeBackdrop(this._backdropCreated);
        });

        return componentRef;
    }

    private createItemView() {
        this.containerHost.detach();
        this.containerHost.insert(this._viewRef);
    }

    private removeBackdrop(componentRef: ComponentRef<any>) {
        this._appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    private cleanup(): void {
        if (this.listenerClickItem) {
            this.listenerClickItem();
        }
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
