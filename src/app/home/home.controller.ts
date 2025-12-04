import { Path } from "../app.routes";
import { RouterService } from "../router/router.service";

export class HomeController {
    constructor(private readonly routerService: RouterService) { }

    navigateToGame(): void {
        this.routerService.navigateTo(Path.Game);
    }

    navigateToTrophies(): void {
        this.routerService.navigateTo(Path.Trophies);
    }
}