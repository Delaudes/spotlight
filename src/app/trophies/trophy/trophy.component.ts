import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrophyViewModel } from '../models/trophies.view.model';

@Component({
    selector: 'app-trophy',
    imports: [],
    templateUrl: './trophy.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrophyComponent {
    readonly trophy = input.required<TrophyViewModel>();
}
