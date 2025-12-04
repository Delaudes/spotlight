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
}

export enum TrophyTitleViewModel {
    BEGINNER = 'Débutant',
    INTERMEDIATE = 'Intermédiaire',
    ADVANCED = 'Avancé',
    EXPERT = 'Expert',
    MASTER = 'Maître',
    BEGINNER_EXOTIC = 'Débutant Exotique',
    INTERMEDIATE_EXOTIC = 'Intermédiaire Exotique',
    ADVANCED_EXOTIC = 'Avancé Exotique',
    EXPERT_EXOTIC = 'Expert Exotique',
    MASTER_EXOTIC = 'Maître Exotique'
}

