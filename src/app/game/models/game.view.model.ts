import { LightMode } from "./light-mode.enum";

export interface GameViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly congratulations: string;

    grid: GridViewModel
}

export interface GridViewModel {
    cells: CellViewModel[][];
    spotlight: boolean;
    size: number;
    lightMode: LightMode;
    sizeOptions: number[];
    lightModeOptions: LightMode[];
}


export interface CellViewModel {
    readonly x: number;
    readonly y: number;
    lightLevel: number;
}
