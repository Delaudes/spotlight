import { RouterService } from "./router.service";

export class FakeRouterService implements RouterService {
    path?: string;

    navigateTo(path: string): void {
        this.path = path;
    }
}