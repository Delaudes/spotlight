import { LightMode } from "./light-mode.enum";

export interface GameViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly congratulations: string;

    grid: CellViewModel[][];
    spotlight: boolean
    gridSize: number;
    gridSizes: number[];
    lightMode: LightMode;
    lightModes: LightMode[];
}


export interface CellViewModel {
    readonly x: number;
    readonly y: number;
    lightLevel: number;
}
