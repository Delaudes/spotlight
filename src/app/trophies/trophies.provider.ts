import { ROUTER_SERVICE_TOKEN } from "../router/router.service";
import { AngularSignalService } from "../signal/angular-signal.service";
import { STORAGE_SERVICE_TOKEN } from "../storage/storage.service";
import { TrophiesViewModel } from "./models/trophies.view.model";
import { TrophiesController } from "./trophies.controller";
import { TrophiesPresenter } from "./trophies.presenter";
import { TrophiesService } from "./trophies.service";
import { TrophiesView } from "./trophies.view";


export const TROPHIES_PROVIDER = [
    {
        provide: TrophiesView,
        useFactory: () => new TrophiesView(new AngularSignalService<TrophiesViewModel>())
    },
    {
        provide: TrophiesPresenter,
        deps: [TrophiesView]
    },
    {
        provide: TrophiesService,
        deps: [STORAGE_SERVICE_TOKEN, TrophiesPresenter]
    },
    {
        provide: TrophiesController,
        deps: [TrophiesService, ROUTER_SERVICE_TOKEN]
    },
];

