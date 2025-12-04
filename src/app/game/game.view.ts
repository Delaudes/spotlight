import { SignalService } from "../signal/signal.service";
import { GameViewModel, GridViewModel, LightModeViewModel } from "./models/game.view.model";

export class GameView {
    constructor(public readonly viewModel: SignalService<GameViewModel>) {
        this.viewModel.set({
            title: 'Spotlight',
            subtitle: 'Light Them All Up!',
            congratulations: 'Félicitations ! Vous avez allumé toute la grille !',
            trophiesButtonLabel: 'Trophées',
            homeButtonLabel: 'Accueil',
            grid: this.createGrid(3, LightModeViewModel.CLASSIC),
        })
    }

    createGrid(size: number, lightMode: LightModeViewModel): GridViewModel {
        const cells = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push({ x, y, lightLevel: 0 });
            }
            cells.push(row);
        }
        return {
            cells,
            spotlight: false,
            size: size,
            sizeOptions: [3, 4, 5, 6, 7],
            lightMode: lightMode,
            lightModeOptions: [LightModeViewModel.CLASSIC, LightModeViewModel.EXOTIC]
        };
    }

    update(game: Partial<GameViewModel>) {
        this.viewModel.update((current) => ({
            ...current,
            ...game
        }));
    }
}