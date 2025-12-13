import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { FakeStorageService } from '../storage/fake-storage.service';
import { STORAGE_SERVICE_TOKEN } from '../storage/storage.service';
import { TrophyTitleDomainModel } from './models/trophies.domain.model';
import { TrophyTitleViewModel } from './models/trophies.view.model';
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


    it('should have trophies', () => {
        storage.setItem('trophies', [
            TrophyTitleDomainModel.BEGINNER,
            TrophyTitleDomainModel.INTERMEDIATE_EXOTIC,
        ]);

        spectator = createComponent();

        expect((spectator.queryAll(TrophyComponent).map(c => c.trophy()))).toEqual([
            createSpotlightTrophy(TrophyTitleViewModel.BEGINNER, 3, 1, true),
            createSpotlightTrophy(TrophyTitleViewModel.INTERMEDIATE, 4, 1, false),
            createSpotlightTrophy(TrophyTitleViewModel.ADVANCED, 5, 1, false),
            createSpotlightTrophy(TrophyTitleViewModel.EXPERT, 6, 1, false),
            createSpotlightTrophy(TrophyTitleViewModel.MASTER, 7, 1, false),
            createSpotlightTrophy(TrophyTitleViewModel.BEGINNER_EXOTIC, 3, 2, false),
            createSpotlightTrophy(TrophyTitleViewModel.INTERMEDIATE_EXOTIC, 4, 2, true),
            createSpotlightTrophy(TrophyTitleViewModel.ADVANCED_EXOTIC, 5, 2, false),
            createSpotlightTrophy(TrophyTitleViewModel.EXPERT_EXOTIC, 6, 2, false),
            createSpotlightTrophy(TrophyTitleViewModel.MASTER_EXOTIC, 7, 2, false),
            createBullseyeTrophy(TrophyTitleViewModel.BEGINNER_BULLSEYE, 3, 1, false),
            createBullseyeTrophy(TrophyTitleViewModel.ADVANCED_BULLSEYE, 5, 1, false),
            createBullseyeTrophy(TrophyTitleViewModel.MASTER_BULLSEYE, 7, 1, false),
            createBullseyeTrophy(TrophyTitleViewModel.BEGINNER_EXOTIC_BULLSEYE, 3, 2, false),
            createBullseyeTrophy(TrophyTitleViewModel.ADVANCED_EXOTIC_BULLSEYE, 5, 2, false),
            createBullseyeTrophy(TrophyTitleViewModel.MASTER_EXOTIC_BULLSEYE, 7, 2, false)
        ]);
    });

    function createSpotlightTrophy(title: TrophyTitleViewModel, size: number, lightLevel: number, unlocked: boolean) {
        const grid = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                row.push({ x, y, lightLevel });
            }
            grid.push(row);
        }
        return { title, grid, unlocked };
    }

    function createBullseyeTrophy(title: TrophyTitleViewModel, size: number, cellMaxLevel: number, unlocked: boolean) {
        const grid = [];
        const center = Math.floor(size / 2);
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                const lightLevel = (x === center && y === center) ? cellMaxLevel : 0;
                row.push({ x, y, lightLevel });
            }
            grid.push(row);
        }
        return { title, grid, unlocked };
    }
});

