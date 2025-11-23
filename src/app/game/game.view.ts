import { SignalService } from "../signal/signal.service";
import { CellViewModel, GameViewModel } from "./models/game.view.model";

export class GameView {
    constructor(public readonly gameViewModel: SignalService<GameViewModel>) {
        this.gameViewModel.set({
            title: 'Spotlight',
            subtitle: 'Light Them All Up!',
            homeLinkLabel: 'home',
            grid: this.createGrid(5)
        })
    }

    private createGrid(size: number): CellViewModel[][] {
        const grid = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push({ x, y, lightOn: false });
            }
            grid.push(row);
        }
        return grid;
    }
}