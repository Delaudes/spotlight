import { RouterService } from "./router.service";

export class FakeRouterService implements RouterService {
    lastNavigatedPath?: string;

    navigateTo(path: string): void {
        this.lastNavigatedPath = path;
    }
}