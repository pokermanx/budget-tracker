import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NbToastrService, NbGlobalPositionStrategy } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private toastrService: NbToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                const position = 'bottom-end';
                // @ts-ignore
                this.toastrService.show(err.statusText, 'Error', {status: NbToastStatus.DANGER, position});
            }
        }));
    }
}
