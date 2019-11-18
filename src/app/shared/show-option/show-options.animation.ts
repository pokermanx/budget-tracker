import { transition, style, animate, trigger, animateChild, group, query, AnimationTriggerMetadata, state } from '@angular/animations';

export function onMoveUpAnimation() {
    return [
        trigger('moveUp', [
            transition('void => *', [
                group([
                    query('@*', animateChild()),
                    style({ transform: 'translateY(0px)' }),
                    animate('250ms 30ms ease', style({
                        transform: 'translateY(-100px)'
                    })),
                ])
            ]),
            transition('* => void', [
                group([
                    style({ transform: 'translateY(-100px)' }),
                    query('@*', [animateChild()], {optional: true}),
                    animate('250ms 30ms ease-out', style({
                        transform: 'translateY(0px)'
                    })),
                ]),
            ]),
        ]),
        trigger('appearOptions', [
            transition(':enter', [
                query('ul', [
                    style({ transform: 'translateY(-100px) scale(0)' }),
                    animate('200ms 0ms ease-in', style({
                        transform: 'translateY(0) scale(1)',
                    })),
                ]),
            ]),
            transition(':leave', [
                query('ul', [
                    style({ transform: 'translateY(0px) scale(1)' }),
                    animate('250ms 30ms ease-in', style({
                        transform: 'translateY(-10px) scale(0)',
                    })),
                ]),
            ])
        ])
    ] as AnimationTriggerMetadata[];
}
