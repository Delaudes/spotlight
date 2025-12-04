import { SignalService } from "../signal/signal.service";
import { HomeViewModel } from "./models/home.view.model";

export class HomeView {
    constructor(public readonly viewModel: SignalService<HomeViewModel>) {
        this.viewModel.set({
            title: 'Spotlight',
            subtitle: 'Light Them All Up!',
            gameRules: 'Cliquez sur une cellule pour l\'allumer ou l\'éteindre. Attention, ses voisines changent aussi d\'état. Allumez toute la grille pour gagner.',
            playButtonLabel: 'Jouer',
            trophiesButtonLabel: 'Trophées'
        })
    }
}