import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { FakeStorageService } from '../storage/fake-storage.service';
import { STORAGE_SERVICE_TOKEN } from '../storage/storage.service';
import { TrophiesComponent } from './trophies.component';
import { TROPHIES_PROVIDER } from './trophies.provider';

describe('TrophiesComponent', () => {
    let spectator: Spectator<TrophiesComponent>;
    let router: FakeRouterService;

    const createComponent = createComponentFactory({
        component: TrophiesComponent,
        providers: [
            TROPHIES_PROVIDER,
            {
                provide: STORAGE_SERVICE_TOKEN,
                useClass: FakeStorageService
            },
            {
                provide: ROUTER_SERVICE_TOKEN,
                useFactory: () => router
            }
        ],
    });

    beforeEach(() => {
        router = new FakeRouterService();
        spectator = createComponent();
    });

    it('should have title section', () => {
        expect(spectator.query('[data-testid="title-section"]')?.textContent).toContain('Spotlight Trophies');
        expect(spectator.query('[data-testid="title-section"]')?.textContent).toContain('Collect Them All!');
    });

    it('should have home button', () => {
        spectator.click('[data-testid="home-button"]');

        expect(router.lastNavigatedPath).toEqual('');
        expect(spectator.query('[data-testid="home-button"]')?.textContent).toContain('Accueil');
    });

    it('should have play button', () => {
        spectator.click('[data-testid="play-button"]');

        expect(router.lastNavigatedPath).toEqual('game');
        expect(spectator.query('[data-testid="play-button"]')?.textContent).toContain('Jouer');
    });
});
