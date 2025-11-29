import { GamePresenter } from "./game.presenter";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { LightMode } from "./models/light-mode.enum";

export class GameService {
    constructor(private readonly gamePresenter: GamePresenter) { }

    play(gridDomain: GridDomainModel, cellDomain: CellDomainModel) {
        gridDomain.playCell(cellDomain);
        this.gamePresenter.presentGrid(gridDomain);
    }

    chooseGridSize(size: number, mode: LightMode) {
        const gridDomain = this.createEmptyGrid(size, mode);
        this.gamePresenter.presentGrid(gridDomain);
    }

    chooseLightMode(mode: LightMode, size: number) {
        const gridDomain = this.createEmptyGrid(size, mode);
        this.gamePresenter.presentGrid(gridDomain);
    }

    private createEmptyGrid(size: number, mode: LightMode): GridDomainModel {
        const cells = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push(new CellDomainModel(x, y, 0));
            }
            cells.push(row);
        }
        return new GridDomainModel(cells, mode);
    }
}