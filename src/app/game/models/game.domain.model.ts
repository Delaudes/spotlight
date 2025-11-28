export class CellDomainModel {
    constructor(public readonly x: number, public readonly y: number) { }

    getCellsToModify(): CellsListDomainModel {
        return new CellsListDomainModel([
            new CellDomainModel(this.x, this.y),
            new CellDomainModel(this.x + 1, this.y),
            new CellDomainModel(this.x - 1, this.y),
            new CellDomainModel(this.x, this.y + 1),
            new CellDomainModel(this.x, this.y - 1),
        ]);
    }

    isValidCell(gridSize: number): boolean {
        return this.x >= 0 && this.x < gridSize && this.y >= 0 && this.y < gridSize;
    }
}

export class CellsListDomainModel {
    constructor(public readonly cells: CellDomainModel[]) { }

    getValidCells(gridSize: number): CellDomainModel[] {
        return this.cells.filter(cell => cell.isValidCell(gridSize));
    }
}