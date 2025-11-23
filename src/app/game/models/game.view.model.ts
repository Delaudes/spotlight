export interface GameViewModel {
    title: string;
    subtitle: string;
    homeLinkLabel: string;
    grid: CellViewModel[][];
}


export interface CellViewModel {
    x: number;
    y: number;
    lightOn: boolean;
}
