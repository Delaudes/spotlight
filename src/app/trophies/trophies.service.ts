import { StorageService } from "../storage/storage.service";
import { GRID_BY_TITLE, STORAGE_KEY, TrophiesListDomainModel, TrophyDomainModel, TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophiesPresenter } from "./trophies.presenter";

export class TrophiesService {

    constructor(private readonly storage: StorageService, private readonly presenter: TrophiesPresenter) { }

    loadTrophies(): void {
        const unlockedTitles = this.storage.getItem<TrophyTitleDomainModel[]>(STORAGE_KEY) || [];

        const trophiesList = new TrophiesListDomainModel(
            Object.entries(GRID_BY_TITLE).map(([title, grid]) =>
                new TrophyDomainModel(title as TrophyTitleDomainModel, grid)
            )
        );
        this.presenter.presentTrophies(trophiesList, unlockedTitles)
    }
}