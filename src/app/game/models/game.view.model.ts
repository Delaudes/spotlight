export interface GameViewModel {
    title: string;
    subtitle: string;
    congratulations: string;
    grid: CellViewModel[][];
    spotlight: boolean
    gridSizes: number[];
}


export interface CellViewModel {
    x: number;
    y: number;
    lightOn: boolean;
}
