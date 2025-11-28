import { AngularSignalService } from "../signal/angular-signal.service";
import { GameController } from "./game.controller";
import { GamePresenter } from "./game.presenter";
import { GameService } from "./game.service";
import { GameView } from "./game.view";
import { GameViewModel } from "./models/game.view.model";

export const GAME_PROVIDER = [
    {
        provide: GameView,
        useFactory: () => new GameView(new AngularSignalService<GameViewModel>())
    },
    {
        provide: GameController,
        deps: [GameService]
    },
    {
        provide: GamePresenter,
        deps: [GameView]
    },
    {
        provide: GameService,
        deps: [GamePresenter]
    }
];