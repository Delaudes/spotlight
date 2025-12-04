import { SignalService } from "../signal/signal.service";
import { TrophiesViewModel } from "./models/trophies.view.model";

export class TrophiesView {
    constructor(public readonly viewModel: SignalService<TrophiesViewModel>) {
        this.viewModel.set({
            title: "Spotlight Trophies",
            subtitle: "Collect Them All!",
            emptyTrophiesMessage: "Aucun trophée débloqué pour le moment. Continuez à jouer pour en débloquer !",
            trophies: [],
            homeButtonLabel: "Accueil",
            playButtonLabel: "Jouer"
        })
    }

    update(viewModel: Partial<TrophiesViewModel>) {
        this.viewModel.update((current) => ({
            ...current,
            ...viewModel
        }));
    }
}