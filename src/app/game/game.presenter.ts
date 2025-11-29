import { GameView } from "./game.view";
import { GridDomainModel } from "./models/game.domain.model";
import { GridViewModel, LightMode } from "./models/game.view.model";

export class GamePresenter {
    constructor(private readonly gameView: GameView) { }

    presentGrid(gridDomain: GridDomainModel): void {
        const gridViewModel = this.convertToGridViewModel(gridDomain);
        this.gameView.update({ grid: gridViewModel });
    }

    private convertToGridViewModel(gridDomain: GridDomainModel): GridViewModel {
        const cells = gridDomain.cells.map(row =>
            row.map(cell => ({
                x: cell.x,
                y: cell.y,
                lightLevel: cell.lightLevel
            }))
        );

        return {
            cells: cells,
            spotlight: gridDomain.isSpotlight(),
            size: gridDomain.cells.length,
            sizeOptions: [3, 4, 5, 6, 7],
            lightMode: gridDomain.cellMaxLevel === 1 ? LightMode.CLASSIC : LightMode.EXOTIC,
            lightModeOptions: [LightMode.CLASSIC, LightMode.EXOTIC]
        };
    }
}