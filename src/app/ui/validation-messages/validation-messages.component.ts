import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-validation-messages',
    templateUrl: './validation-messages.component.html',
    styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {

    @Input() errors;

    errorMessage: string;

    constructor() {}

    // TODO

    ngOnInit() {
        if (this.errors.required) {
            this.errorMessage = 'This field is required.';
        } else if (this.errors.pattern) {
            this.errorMessage = 'Invalid parameters';
        }
    }
}
