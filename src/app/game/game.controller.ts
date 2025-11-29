import { GameService } from "./game.service";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { CellViewModel, GridViewModel, LightMode } from "./models/game.view.model";

export class GameController {
    constructor(private readonly gameService: GameService) { }

    play(gridView: GridViewModel, cellView: CellViewModel) {
        const gridDomain = this.convertToGridDomain(gridView);
        const cellDomain = new CellDomainModel(cellView.x, cellView.y, cellView.lightLevel);
        this.gameService.play(gridDomain, cellDomain);
    }

    modifyGrid(size: number, mode: LightMode) {
        this.gameService.modifyGrid(size, mode === LightMode.CLASSIC ? 1 : 2);
    }

    private convertToGridDomain(gridView: GridViewModel): GridDomainModel {
        const cells = gridView.cells.map(row =>
            row.map(cell => new CellDomainModel(cell.x, cell.y, cell.lightLevel))
        );
        return new GridDomainModel(cells, gridView.lightMode === LightMode.CLASSIC ? 1 : 2);
    }
}