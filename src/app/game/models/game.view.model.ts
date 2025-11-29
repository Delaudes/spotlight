
export interface GameViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly congratulations: string;

    grid: GridViewModel
}

export interface GridViewModel {
    readonly cells: CellViewModel[][];
    readonly spotlight: boolean;
    readonly size: number;
    readonly lightMode: LightMode;
    readonly sizeOptions: number[];
    readonly lightModeOptions: LightMode[];
}


export interface CellViewModel {
    readonly x: number;
    readonly y: number;
    readonly lightLevel: number;
}

export enum LightMode {
    CLASSIC = 'Classique',
    EXOTIC = 'Exotique'
}

