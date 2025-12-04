import { GridDomainModel } from "../game/models/game.domain.model";
import { StorageService } from "../storage/storage.service";
import { GRID_BY_TITLE, TITLE_BY_GRID, TrophiesListDomainModel, TrophyDomainModel, TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophiesPresenter } from "./trophies.presenter";

export class TrophiesService {
    private readonly storageKey = 'trophies';
    constructor(private readonly storage: StorageService, private readonly presenter: TrophiesPresenter) { }

    getUnlockedTrophyTitle(grid: GridDomainModel): TrophyTitleDomainModel | undefined {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(this.storageKey);
        const unlockedTitle = TITLE_BY_GRID.get(JSON.stringify(grid))
        if (titles?.find(title => title === unlockedTitle)) {
            return undefined;
        }
        return unlockedTitle
    }

    unlockTrophy(trophyTitle: TrophyTitleDomainModel): void {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(this.storageKey);
        if (titles) {
            titles.push(trophyTitle);
            this.storage.setItem<TrophyTitleDomainModel[]>(this.storageKey, titles);
            return;
        }
        this.storage.setItem<TrophyTitleDomainModel[]>(this.storageKey, [trophyTitle]);
    }

    loadTrophies(): void {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(this.storageKey);
        if (titles) {
            const trophiesList = new TrophiesListDomainModel(
                titles.map(title => new TrophyDomainModel(title, GRID_BY_TITLE.get(title)!))
            );
            this.presenter.presentTrophies(trophiesList)
        }
    }
}