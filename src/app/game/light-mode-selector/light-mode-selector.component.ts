import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameController } from '../game.controller';
import { GameView } from '../game.view';

@Component({
    selector: 'app-light-mode-selector',
    imports: [],
    templateUrl: './light-mode-selector.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightModeSelectorComponent {
    private readonly view = inject(GameView);
    protected readonly controller = inject(GameController);

    protected get viewModel() {
        return this.view.viewModel.get();
    }
}
