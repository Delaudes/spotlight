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
                grid: newGrid
            };
        });
    }
}