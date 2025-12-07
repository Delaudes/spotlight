import { GameView } from "./game.view";
import { GridDomainModel } from "./models/game.domain.model";
import { GridViewModel, LightModeViewModel } from "./models/game.view.model";

export class GamePresenter {
    constructor(private readonly view: GameView) { }

    presentGrid(gridDomain: GridDomainModel): void {
        const gridView = this.convertToGridView(gridDomain);
        this.view.update({ grid: gridView });
    }

    private convertToGridView(gridDomain: GridDomainModel): GridViewModel {
        const cellsView = gridDomain.cells.map(row =>
            row.map(cell => ({
                x: cell.x,
                y: cell.y,
                lightLevel: cell.lightLevel
            }))
        );

        return {
            cells: cellsView,
            spotlight: gridDomain.isSpotlight(),
            size: gridDomain.cells.length,
            sizeOptions: [3, 4, 5, 6, 7],
            lightMode: gridDomain.cellMaxLevel === 1 ? LightModeViewModel.CLASSIC : LightModeViewModel.EXOTIC,
            lightModeOptions: [LightModeViewModel.CLASSIC, LightModeViewModel.EXOTIC]
        };
    }

    presentUnlockedTrophy(): void {
        const currentViewModel = this.view.viewModel.get();
        this.view.update({
            hasNewTrophies: true,
            nbNewTrophies: currentViewModel.nbNewTrophies + 1
        });
    }
}