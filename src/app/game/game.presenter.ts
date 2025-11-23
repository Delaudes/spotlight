import { GameView } from "./game.view";

export class GamePresenter {
    constructor(private readonly gameView: GameView) { }

    presentCells(cells: { x: number, y: number }[]): void {
        this.gameView.gameViewModel.update((current) => {
            const newGrid = current.grid.map(row => row.map(cell => ({ ...cell })));
            for (const cell of cells) {
                const targetCell = newGrid[cell.x][cell.y];
                targetCell.lightOn = !targetCell.lightOn;
            }
            return {
                ...current,
                grid: newGrid,
                spotlight: newGrid.flat().every(cell => cell.lightOn)
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
}