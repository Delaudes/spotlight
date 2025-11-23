import { SignalService } from "../signal/signal.service";
import { CellViewModel, GameViewModel } from "./models/game.view.model";

export class GameView {
    constructor(public readonly gameViewModel: SignalService<GameViewModel>) {
        this.gameViewModel.set({
            title: 'Spotlight',
            subtitle: 'Light Them All Up!',
            congratulations: 'Félicitations ! Vous avez allumé toute la grille !',

            grid: this.createGrid(3),
            spotlight: false,
            gridSizes: [3, 4, 5, 6, 7]
        })
    }

    createGrid(size: number): CellViewModel[][] {
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