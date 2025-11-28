import { GameView } from "./game.view";
import { LightMode } from "./models/light-mode.enum";

export class GamePresenter {
    constructor(private readonly gameView: GameView) { }

    presentCells(cells: { x: number, y: number }[]): void {
        this.gameView.gameViewModel.update((current) => {
            const newGrid = current.grid.map(row => row.map(cell => ({ ...cell })));
            const maxLevel = current.lightMode === LightMode.Double ? 1 : 2
            for (const cell of cells) {
                const targetCell = newGrid[cell.x][cell.y];
                targetCell.lightLevel = (targetCell.lightLevel + 1) % (maxLevel + 1)
            }
            return {
                ...current,
                grid: newGrid,
                spotlight: newGrid.flat().every(cell => cell.lightLevel === maxLevel)
            };
        });
    }

    presentGridSize(size: number): void {
        this.gameView.gameViewModel.update((current) => ({
            ...current,
            grid: this.gameView.createGrid(size),
            gridSize: size,
            spotlight: false
        }));
    }

    presentLightMode(mode: LightMode): void {
        this.gameView.gameViewModel.update((current) => ({
            ...current,
            lightMode: mode,
            grid: this.gameView.createGrid(current.gridSize),
            spotlight: false
        }));
    }
}