import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameController } from './game.controller';
import { GAME_PROVIDER } from './game.provider';
import { GameView } from './game.view';
import { GridSizeSelectorComponent } from './grid-size-selector/grid-size-selector.component';
import { LightModeSelectorComponent } from './light-mode-selector/light-mode-selector.component';

@Component({
  selector: 'app-game',
  imports: [GridSizeSelectorComponent, LightModeSelectorComponent, GameBoardComponent],
  providers: [GAME_PROVIDER],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly view = inject(GameView);
  protected readonly controller = inject(GameController);

  protected get viewModel() {
    return this.view.viewModel.get();
  }
}
