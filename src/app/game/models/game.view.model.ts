export interface GameViewModel {
    readonly title: string;
    readonly subtitle: string;
    readonly congratulations: string;

    grid: CellViewModel[][];
    spotlight: boolean
    gridSize: number;
    gridSizes: number[];
}


export interface CellViewModel {
    readonly x: number;
    readonly y: number;
    lightOn: boolean;
}
