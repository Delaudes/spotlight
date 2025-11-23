import { path } from "../app.routes";
import { RouterService } from "../router/router.service";

export class HomeController {
    constructor(private readonly routerService: RouterService) { }

    navigateToGame(): void {
        this.routerService.navigateTo(path.game);
    }
}