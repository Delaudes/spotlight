import { TrophiesListDomainModel, TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophyTitleViewModel } from "./models/trophies.view.model";
import { TrophiesView } from "./trophies.view";

export class TrophiesPresenter {
    private readonly titleViewByDomain: Record<TrophyTitleDomainModel, TrophyTitleViewModel> = {
        [TrophyTitleDomainModel.BEGINNER]: TrophyTitleViewModel.BEGINNER,
        [TrophyTitleDomainModel.INTERMEDIATE]: TrophyTitleViewModel.INTERMEDIATE,
        [TrophyTitleDomainModel.ADVANCED]: TrophyTitleViewModel.ADVANCED,
        [TrophyTitleDomainModel.EXPERT]: TrophyTitleViewModel.EXPERT,
        [TrophyTitleDomainModel.MASTER]: TrophyTitleViewModel.MASTER,
        [TrophyTitleDomainModel.BEGINNER_EXOTIC]: TrophyTitleViewModel.BEGINNER_EXOTIC,
        [TrophyTitleDomainModel.INTERMEDIATE_EXOTIC]: TrophyTitleViewModel.INTERMEDIATE_EXOTIC,
        [TrophyTitleDomainModel.ADVANCED_EXOTIC]: TrophyTitleViewModel.ADVANCED_EXOTIC,
        [TrophyTitleDomainModel.EXPERT_EXOTIC]: TrophyTitleViewModel.EXPERT_EXOTIC,
        [TrophyTitleDomainModel.MASTER_EXOTIC]: TrophyTitleViewModel.MASTER_EXOTIC
    };

    constructor(private readonly view: TrophiesView) { }

    presentTrophies(trophiesListDomain: TrophiesListDomainModel): void {
        this.view.update({
            trophies: trophiesListDomain.trophies.map(trophy => ({
                title: this.titleViewByDomain[trophy.title],
                grid: trophy.grid.cells.map(row => row.map(cell => ({
                    x: cell.x,
                    y: cell.y,
                    lightLevel: cell.lightLevel
                })))
            }))
        });
    }
}

