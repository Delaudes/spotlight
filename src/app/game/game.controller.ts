import { Path } from "../app.routes";
import { RouterService } from "../router/router.service";
import { TrophiesService } from "../trophies/trophies.service";
import { GameService } from "./game.service";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { CellViewModel, GridViewModel, LightModeViewModel } from "./models/game.view.model";

export class GameController {
    constructor(
        private readonly gameService: GameService,
        private readonly trophiesService: TrophiesService,
        private readonly routerService: RouterService
    ) { }

    play(gridView: GridViewModel, cellView: CellViewModel) {
        const gridDomain = this.convertToGridDomain(gridView);
        const cellDomain = new CellDomainModel(cellView.x, cellView.y, cellView.lightLevel);
        const newGridDomain = this.gameService.play(gridDomain, cellDomain);
        const unlockedTrophyTitle = this.trophiesService.getUnlockedTrophyTitle(newGridDomain);
        if (unlockedTrophyTitle) {
            this.trophiesService.unlockTrophy(unlockedTrophyTitle);
        }
    }

    updateGrid(size: number, lightMode: LightModeViewModel) {
        this.gameService.updateGrid(size, lightMode === LightModeViewModel.CLASSIC ? 1 : 2);
    }

    navigateToTrophies() {
        this.routerService.navigateTo(Path.Trophies);
    }

    navigateToHome() {
        this.routerService.navigateTo(Path.Home);
    }

    private convertToGridDomain(gridView: GridViewModel): GridDomainModel {
        const cellsDomain = gridView.cells.map(row =>
            row.map(cell => new CellDomainModel(cell.x, cell.y, cell.lightLevel))
        );
        return new GridDomainModel(cellsDomain, gridView.lightMode === LightModeViewModel.CLASSIC ? 1 : 2);
    }
}