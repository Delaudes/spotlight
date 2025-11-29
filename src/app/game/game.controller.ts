import { GameService } from "./game.service";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { CellViewModel, GridViewModel } from "./models/game.view.model";
import { LightMode } from "./models/light-mode.enum";

export class GameController {
    constructor(private readonly gameService: GameService) { }

    play(gridView: GridViewModel, cellView: CellViewModel) {
        const gridDomain = this.convertToGridDomain(gridView);
        const cellDomain = new CellDomainModel(cellView.x, cellView.y, cellView.lightLevel);
        this.gameService.play(gridDomain, cellDomain);
    }

    chooseGridSize(size: number, currentMode: LightMode) {
        this.gameService.chooseGridSize(size, currentMode);
    }

    chooseLightMode(mode: LightMode, currentSize: number) {
        this.gameService.chooseLightMode(mode, currentSize);
    }

    private convertToGridDomain(gridView: GridViewModel): GridDomainModel {
        const cells = gridView.cells.map(row =>
            row.map(cell => new CellDomainModel(cell.x, cell.y, cell.lightLevel))
        );
        return new GridDomainModel(cells, gridView.lightMode);
    }
}