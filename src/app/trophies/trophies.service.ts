import { StorageService } from "../storage/storage.service";
import { GRID_BY_TITLE, STORAGE_KEY, TrophiesListDomainModel, TrophyDomainModel, TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophiesPresenter } from "./trophies.presenter";

export class TrophiesService {

    constructor(private readonly storage: StorageService, private readonly presenter: TrophiesPresenter) { }

    loadTrophies(): void {
        const titles = this.storage.getItem<TrophyTitleDomainModel[]>(STORAGE_KEY);
        if (titles) {
            const trophiesList = new TrophiesListDomainModel(
                titles.map(title => new TrophyDomainModel(title, GRID_BY_TITLE.get(title)!))
            );
            this.presenter.presentTrophies(trophiesList)
        }
    }
}