import { GameView } from "./game.view";
import { CellDomainModel } from "./models/game.domain.model";
import { LightMode } from "./models/light-mode.enum";

export class GamePresenter {
    constructor(private readonly gameView: GameView) { }

    presentCells(cells: CellDomainModel[]): void {
        const newGrid = this.gameView.gameViewModel.get().grid
        const maxLevel = this.gameView.gameViewModel.get().lightMode === LightMode.Double ? 1 : 2
        for (const cell of cells) {
            const targetCell = newGrid[cell.x][cell.y];
            targetCell.lightLevel = (targetCell.lightLevel + 1) % (maxLevel + 1)
        }

        this.gameView.update({
            grid: newGrid,
            spotlight: newGrid.flat().every(cell => cell.lightLevel === maxLevel)
        });
    }

    presentGridSize(size: number): void {
        this.gameView.update({
            grid: this.gameView.createGrid(size),
            gridSize: size,
            spotlight: false
        });
    }

    presentLightMode(mode: LightMode): void {
        const gridSize = this.gameView.gameViewModel.get().gridSize;
        this.gameView.update({
            lightMode: mode,
            grid: this.gameView.createGrid(gridSize),
            spotlight: false
        });
    }
}