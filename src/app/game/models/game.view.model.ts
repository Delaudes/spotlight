export interface GameViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly congratulations: string;
    readonly grid: GridViewModel;
    readonly trophiesButtonLabel: string;
    readonly homeButtonLabel: string;
    readonly hasNewTrophies: boolean;
    readonly nbNewTrophies: number;
}

export interface GridViewModel {
    readonly cells: CellViewModel[][];
    readonly spotlight: boolean;
    readonly size: number;
    readonly lightMode: LightModeViewModel;
    readonly sizeOptions: number[];
    readonly lightModeOptions: LightModeViewModel[];
}


export interface CellViewModel {
    readonly x: number;
    readonly y: number;
    readonly lightLevel: number;
}

export enum LightModeViewModel {
    CLASSIC = 'Classique',
    EXOTIC = 'Exotique'
}

