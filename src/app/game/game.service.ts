import { GamePresenter } from "./game.presenter";
import { CellDomainModel } from "./models/game.domain.model";
import { LightMode } from "./models/light-mode.enum";

export class GameService {
    constructor(private readonly gamePresenter: GamePresenter) { }

    play(cell: CellDomainModel) {
        const cellsToModify = cell.getCellsToModify()
        this.gamePresenter.presentCells(cellsToModify);
    }

    chooseGridSize(size: number) {
        this.gamePresenter.presentGridSize(size);
    }

    chooseLightMode(mode: LightMode) {
        this.gamePresenter.presentLightMode(mode);
    }
}