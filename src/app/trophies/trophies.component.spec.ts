import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { FakeStorageService } from '../storage/fake-storage.service';
import { STORAGE_SERVICE_TOKEN } from '../storage/storage.service';
import { TrophyTitleDomainModel } from './models/trophies.domain.model';
import { TROPHIES_VIEW_MOCK } from './models/trophies.mock';
import { TrophiesComponent } from './trophies.component';
import { TrophyComponent } from './trophy/trophy.component';

describe('TrophiesComponent', () => {
    let spectator: Spectator<TrophiesComponent>;
    let router: FakeRouterService;
    let storage: FakeStorageService;

    const createComponent = createComponentFactory({
        component: TrophiesComponent,
        providers: [
            {
                provide: STORAGE_SERVICE_TOKEN,
                useFactory: () => storage
            },
            {
                provide: ROUTER_SERVICE_TOKEN,
                useFactory: () => router
            }
        ],
    });

    beforeEach(() => {
        storage = new FakeStorageService();
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
    });

    it('should have play button', () => {
        spectator.click('[data-testid="play-button"]');

        expect(router.lastNavigatedPath).toEqual('game');
    });

    it('should have empty tophies', () => {
        expect(spectator.query('[data-testid="empty"]')?.textContent).toContain("Aucun trophée débloqué pour le moment. Continuez à jouer pour en débloquer !")
    });

    it('should have trophies', () => {
        storage.setItem('trophies', Object.values(TrophyTitleDomainModel));

        spectator = createComponent();

        expect((spectator.queryAll(TrophyComponent).map(c => c.trophy()))).toEqual(TROPHIES_VIEW_MOCK);
    });
});
