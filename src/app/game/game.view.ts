import { SignalService } from "../signal/signal.service";
import { GameViewModel, GridViewModel } from "./models/game.view.model";
import { LightMode } from "./models/light-mode.enum";

export class GameView {
    constructor(public readonly gameViewModel: SignalService<GameViewModel>) {
        this.gameViewModel.set({
            title: 'Spotlight',
            subtitle: 'Light Them All Up!',
            congratulations: 'Félicitations ! Vous avez allumé toute la grille !',

            grid: this.createGrid(3, LightMode.Double),
        })
    }

    createGrid(size: number, mode: LightMode): GridViewModel {
        const cells = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push({ x, y, lightLevel: 0 });
            }
            cells.push(row);
        }
        return {
            cells: cells,
            spotlight: false,
            size: size,
            sizeOptions: [3, 4, 5, 6, 7],
            lightMode: mode,
            lightModeOptions: [LightMode.Double, LightMode.Triple]
        };
    }

    update(game: Partial<GameViewModel>) {
        this.gameViewModel.update((current) => ({
            ...current,
            ...game
        }));
    }
}