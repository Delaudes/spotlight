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
    BEGINNER = 'Soldat Lithium',
    INTERMEDIATE = 'Sergent Béryllium',
    ADVANCED = 'Adjudant Bore',
    EXPERT = 'Colonel Carbone',
    MASTER = 'Général Azote',
    BEGINNER_EXOTIC = 'Matelot Fluor',
    INTERMEDIATE_EXOTIC = 'Maître Soufre',
    ADVANCED_EXOTIC = 'Major Manganèse',
    EXPERT_EXOTIC = 'Enseigne Krypton',
    MASTER_EXOTIC = 'Amiral Indium'
}

