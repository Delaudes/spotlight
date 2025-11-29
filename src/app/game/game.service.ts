import { GamePresenter } from "./game.presenter";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";

export class GameService {
    constructor(private readonly gamePresenter: GamePresenter) { }

    play(gridDomain: GridDomainModel, cellDomain: CellDomainModel) {
        gridDomain.playCell(cellDomain);
        this.gamePresenter.presentGrid(gridDomain);
    }

    modifyGrid(size: number, cellMaxLevel: number) {
        const gridDomain = this.createEmptyGrid(size, cellMaxLevel);
        this.gamePresenter.presentGrid(gridDomain);
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