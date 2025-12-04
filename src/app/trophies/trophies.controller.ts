import { Path } from "../app.routes";
import { RouterService } from "../router/router.service";
import { TrophiesService } from "./trophies.service";

export class TrophiesController {
    constructor(
        private readonly trophiesService: TrophiesService,
        private readonly routerService: RouterService
    ) {
        this.loadTrophies();
    }

    loadTrophies() {
        this.trophiesService.loadTrophies()
    };

    navigateToHome() {
        this.routerService.navigateTo(Path.Home);
    }

    navigateToGame() {
        this.routerService.navigateTo(Path.Game);
    }
}