export class CellDomainModel {
    constructor(public readonly x: number, public readonly y: number) { }

    getCellsToModify(gridSize: number): CellDomainModel[] {
        const potentialCells = [
            new CellDomainModel(this.x, this.y),
            new CellDomainModel(this.x + 1, this.y),
            new CellDomainModel(this.x - 1, this.y),
            new CellDomainModel(this.x, this.y + 1),
            new CellDomainModel(this.x, this.y - 1),
        ];
        return potentialCells.filter(cell => cell.isValidCell(gridSize));
    }

    private isValidCell(gridSize: number): boolean {
        return this.x >= 0 && this.x < gridSize && this.y >= 0 && this.y < gridSize;
    }
}