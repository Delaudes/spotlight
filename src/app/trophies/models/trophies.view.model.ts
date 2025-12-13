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
    MASTER_EXOTIC = 'Amiral Indium',
    BEGINNER_BULLSEYE = 'Dans le Mille',
    ADVANCED_BULLSEYE = 'Pile Poil',
    MASTER_BULLSEYE = 'Au Millimètre Près',
    BEGINNER_EXOTIC_BULLSEYE = 'Seul au Monde',
    ADVANCED_EXOTIC_BULLSEYE = 'Unique en son Genre',
    MASTER_EXOTIC_BULLSEYE = 'L\'Élu',
}

