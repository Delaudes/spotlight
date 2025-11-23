import { ROUTER_SERVICE_TOKEN } from "../router/router.service";
import { AngularSignalService } from "../signal/angular-signal.service";
import { HomeController } from "./home.controller";
import { HomeView } from "./home.view";
import { HomeViewModel } from "./models/home.view.model";

export const HOME_PROVIDER = [
    {
        provide: HomeController,
        deps: [ROUTER_SERVICE_TOKEN]
    },
    {
        provide: HomeView,
        useFactory: () => new HomeView(new AngularSignalService<HomeViewModel>())
    }
] 