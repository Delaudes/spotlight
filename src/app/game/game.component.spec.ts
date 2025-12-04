import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { FakeStorageService } from '../storage/fake-storage.service';
import { STORAGE_SERVICE_TOKEN } from '../storage/storage.service';
import { TROPHIES_PROVIDER } from '../trophies/trophies.provider';
import { GameComponent } from './game.component';
import { GAME_PROVIDER } from './game.provider';
import { LightModeViewModel } from './models/game.view.model';

describe('GameComponent', () => {
  let spectator: Spectator<GameComponent>;
  let router: FakeRouterService;

  const createComponent = createComponentFactory({
    component: GameComponent,
    providers: [GAME_PROVIDER, TROPHIES_PROVIDER,
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
    expect(spectator.query('[data-testid="title-section"]')?.textContent).toContain('Spotlight');
    expect(spectator.query('[data-testid="title-section"]')?.textContent).toContain(
      'Light Them All Up!'
    );
  });

  it('should have grid size selector', () => {
    const gridSizes = [3, 4, 5, 6, 7];
    gridSizes.forEach(size => {
      spectator.click(`[data-testid="grid-size-${size}"]`);
      expect(spectator.queryAll(`[data-testid="cell`).length).toEqual(size * size);
    });
  });

  it('should have light mode selector', () => {
    spectator.click(`[data-testid="light-mode-${LightModeViewModel.EXOTIC}"]`);

    winAlternativeGridSize3();

    expect(spectator.query('[data-testid="victory-message"]')?.textContent).toContain('Félicitations ! Vous avez allumé toute la grille !');
  })

  it('should have victory message', () => {
    expect(spectator.query('[data-testid="victory-message"]')).toBeFalsy();

    winGridSize3();

    expect(spectator.query('[data-testid="victory-message"]')?.textContent).toContain('Félicitations ! Vous avez allumé toute la grille !');
  })

  it('should have trophies button', () => {
    spectator.click('[data-testid="trophies-button"]');

    expect(router.lastNavigatedPath).toEqual('trophies');
    expect(spectator.query('[data-testid="trophies-button"]')?.textContent).toContain('Trophées');
  });

  it('should have home button', () => {
    spectator.click('[data-testid="home-button"]');

    expect(router.lastNavigatedPath).toEqual('');
    expect(spectator.query('[data-testid="home-button"]')?.textContent).toContain('Accueil');
  });

  function winGridSize3() {
    spectator.click('[data-testid-2="cell-0-0"]');
    spectator.click('[data-testid-2="cell-0-2"]');
    spectator.click('[data-testid-2="cell-2-0"]');
    spectator.click('[data-testid-2="cell-2-2"]');
    spectator.click('[data-testid-2="cell-1-1"]');
  }

  function winAlternativeGridSize3() {
    spectator.click('[data-testid-2="cell-0-1"]');
    spectator.click('[data-testid-2="cell-1-0"]');
    spectator.click('[data-testid-2="cell-1-2"]');
    spectator.click('[data-testid-2="cell-2-1"]');
    spectator.click('[data-testid-2="cell-1-1"]');
  }
});
