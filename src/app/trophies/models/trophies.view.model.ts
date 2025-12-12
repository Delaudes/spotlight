import { CellViewModel } from "../../game/models/game.view.model";

export interface TrophiesViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly emptyTrophiesMessage: string;
    readonly trophies: TrophyViewModel[];
    readonly homeButtonLabel: string;
    readonly playButtonLabel: string;
}

export interface TrophyViewModel {
    readonly title: TrophyTitleViewModel;
    readonly grid: CellViewModel[][];
    readonly unlocked: boolean;
}

export enum TrophyTitleViewModel {
    BEGINNER = 'Première Lueur 🐣',
    INTERMEDIATE = 'Apprenti Lumineux 💡',
    ADVANCED = 'Maître des Ombres ⚡',
    EXPERT = 'Gardien de la Lumière 🌟',
    MASTER = 'Seigneur des Photons 🔥',
    BEGINNER_EXOTIC = 'Arc-en-Ciel Débutant 🌈',
    INTERMEDIATE_EXOTIC = 'Artiste Coloré 🎨',
    ADVANCED_EXOTIC = 'Licorne Lumineuse 🦄',
    EXPERT_EXOTIC = 'Magicien de la Lumière 🎪',
    MASTER_EXOTIC = 'Créateur d\'Univers 👑'
}

