import { StorageService } from "../storage/storage.service";
import { STORAGE_KEY, TITLE_BY_GRID, TrophyTitleDomainModel } from "../trophies/models/trophies.domain.model";
import { GamePresenter } from "./game.presenter";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";

export class GameService {
    constructor(
        private readonly presenter: GamePresenter,
        private readonly storage: StorageService
    ) {
    }

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

    getUnlockedTrophyTitle(grid: GridDomainModel): TrophyTitleDomainModel | undefined {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(STORAGE_KEY);
        const unlockedTitle = TITLE_BY_GRID.get(JSON.stringify(grid))
        if (titles?.find(title => title === unlockedTitle)) {
            return undefined;
        }
        return unlockedTitle
    }

    unlockTrophy(trophyTitle: TrophyTitleDomainModel): void {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(STORAGE_KEY);
        this.presenter.presentUnlockedTrophy()
        if (titles) {
            titles.push(trophyTitle);
            this.storage.setItem<TrophyTitleDomainModel[]>(STORAGE_KEY, titles);
            return;
        }
        this.storage.setItem<TrophyTitleDomainModel[]>(STORAGE_KEY, [trophyTitle]);
    }
}