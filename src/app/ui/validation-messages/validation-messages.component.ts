import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-validation-messages',
    templateUrl: './validation-messages.component.html',
    styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent implements OnInit {

    @Input() control: FormControl;

    errorMessage: string;

    constructor() {}

    // TODO

    ngOnInit() {
        this.setError();
        this.control.valueChanges.subscribe(() => {
            this.setError();
        });
    }

    setError() {
        if (this.control.errors && this.control.errors.required) {
            this.errorMessage = 'This field is required.';
        } else if (this.control.errors && this.control.errors.pattern) {
            this.errorMessage = 'Invalid parameters';
        }
    }
}
