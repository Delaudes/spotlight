import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameController } from '../game.controller';
import { GameView } from '../game.view';

@Component({
    selector: 'app-game-board',
    imports: [],
    templateUrl: './game-board.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent {
    private readonly view = inject(GameView);
    protected readonly controller = inject(GameController);

    protected get viewModel() {
        return this.view.viewModel.get();
    }
}
