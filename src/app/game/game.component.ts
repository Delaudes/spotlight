import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameController } from './game.controller';
import { GAME_PROVIDER } from './game.provider';
import { GameView } from './game.view';

@Component({
  selector: 'app-game',
  imports: [],
  providers: [GAME_PROVIDER],
  templateUrl: './game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  private readonly gameView = inject(GameView);
  protected readonly gameController = inject(GameController);

  get viewModel() {
    return this.gameView.gameViewModel.get();
  }
}
