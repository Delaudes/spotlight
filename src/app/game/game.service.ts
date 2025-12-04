import { GamePresenter } from "./game.presenter";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";

export class GameService {
    constructor(private readonly presenter: GamePresenter) { }

    play(grid: GridDomainModel, cell: CellDomainModel): GridDomainModel {
        grid.play(cell);
        this.presenter.presentGrid(grid);
        return grid
    }

    updateGrid(size: number, cellMaxLevel: number) {
        const grid = this.createEmptyGrid(size, cellMaxLevel);
        this.presenter.presentGrid(grid);
    }

    private createEmptyGrid(size: number, cellMaxLevel: number): GridDomainModel {
        const cells = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push(new CellDomainModel(x, y, 0));
            }
            cells.push(row);
        }
        return new GridDomainModel(cells, cellMaxLevel);
    }
}