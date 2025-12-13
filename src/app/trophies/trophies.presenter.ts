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
        [TrophyTitleDomainModel.MASTER_EXOTIC]: TrophyTitleViewModel.MASTER_EXOTIC,
        [TrophyTitleDomainModel.BEGINNER_BULLSEYE]: TrophyTitleViewModel.BEGINNER_BULLSEYE,
        [TrophyTitleDomainModel.ADVANCED_BULLSEYE]: TrophyTitleViewModel.ADVANCED_BULLSEYE,
        [TrophyTitleDomainModel.MASTER_BULLSEYE]: TrophyTitleViewModel.MASTER_BULLSEYE,
        [TrophyTitleDomainModel.BEGINNER_EXOTIC_BULLSEYE]: TrophyTitleViewModel.BEGINNER_EXOTIC_BULLSEYE,
        [TrophyTitleDomainModel.ADVANCED_EXOTIC_BULLSEYE]: TrophyTitleViewModel.ADVANCED_EXOTIC_BULLSEYE,
        [TrophyTitleDomainModel.MASTER_EXOTIC_BULLSEYE]: TrophyTitleViewModel.MASTER_EXOTIC_BULLSEYE,
        [TrophyTitleDomainModel.BEGINNER_FRAME]: TrophyTitleViewModel.BEGINNER_FRAME,
        [TrophyTitleDomainModel.INTERMEDIATE_FRAME]: TrophyTitleViewModel.INTERMEDIATE_FRAME,
        [TrophyTitleDomainModel.ADVANCED_FRAME]: TrophyTitleViewModel.ADVANCED_FRAME,
        [TrophyTitleDomainModel.EXPERT_FRAME]: TrophyTitleViewModel.EXPERT_FRAME,
        [TrophyTitleDomainModel.MASTER_FRAME]: TrophyTitleViewModel.MASTER_FRAME,
        [TrophyTitleDomainModel.BEGINNER_EXOTIC_FRAME]: TrophyTitleViewModel.BEGINNER_EXOTIC_FRAME,
        [TrophyTitleDomainModel.INTERMEDIATE_EXOTIC_FRAME]: TrophyTitleViewModel.INTERMEDIATE_EXOTIC_FRAME,
        [TrophyTitleDomainModel.ADVANCED_EXOTIC_FRAME]: TrophyTitleViewModel.ADVANCED_EXOTIC_FRAME,
        [TrophyTitleDomainModel.EXPERT_EXOTIC_FRAME]: TrophyTitleViewModel.EXPERT_EXOTIC_FRAME,
        [TrophyTitleDomainModel.MASTER_EXOTIC_FRAME]: TrophyTitleViewModel.MASTER_EXOTIC_FRAME
    };

    constructor(private readonly view: TrophiesView) { }

    presentTrophies(trophiesListDomain: TrophiesListDomainModel, unlockedTitles: TrophyTitleDomainModel[]): void {
        this.view.update({
            trophies: trophiesListDomain.trophies.map(trophy => ({
                title: this.titleViewByDomain[trophy.title],
                unlocked: unlockedTitles.includes(trophy.title),
                grid: trophy.grid.cells.map(row => row.map(cell => ({
                    x: cell.x,
                    y: cell.y,
                    lightLevel: cell.lightLevel
                })))
            }))
        });
    }
}

