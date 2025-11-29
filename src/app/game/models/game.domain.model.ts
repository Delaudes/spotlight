
export class CellDomainModel {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public lightLevel: number
    ) { }

    evolve(maxLevel: number): void {
        this.lightLevel = (this.lightLevel + 1) % (maxLevel + 1);
    }
}

export class GridDomainModel {
    constructor(
        public readonly cells: CellDomainModel[][],
        public readonly cellMaxLevel: number
    ) { }

    playCell(cell: CellDomainModel): void {
        const cellsToEvolve = this.getCellsToEvolve(cell);

        for (const cell of cellsToEvolve) {
            cell.evolve(this.cellMaxLevel);
        }
    }

    isSpotlight(): boolean {
        return this.cells.flat().every(cell => cell.lightLevel === this.cellMaxLevel);
    }

    private getCellsToEvolve(cell: CellDomainModel): CellDomainModel[] {
        const neighbors = [
            { x: cell.x, y: cell.y },
            { x: cell.x + 1, y: cell.y },
            { x: cell.x - 1, y: cell.y },
            { x: cell.x, y: cell.y + 1 },
            { x: cell.x, y: cell.y - 1 },
        ];

        return neighbors
            .filter(pos => this.isValidPosition(pos.x, pos.y))
            .map(pos => this.cells[pos.x][pos.y]);
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.cells.length && y >= 0 && y < this.cells.length;
    }


}