import { GameService } from "./game.service";
import { CellDomainModel } from "./models/game.domain.model";
import { CellViewModel } from "./models/game.view.model";
import { LightMode } from "./models/light-mode.enum";

export class GameController {
    constructor(private readonly gameService: GameService) { }

    play(cell: CellViewModel) {
        this.gameService.play(new CellDomainModel(cell.x, cell.y));
    }

    chooseGridSize(size: number) {
        this.gameService.chooseGridSize(size);
    }

    chooseLightMode(mode: LightMode) {
        this.gameService.chooseLightMode(mode);
    }
}