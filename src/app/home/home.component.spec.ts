import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  let router: FakeRouterService;

  const createComponent = createComponentFactory({
    component: HomeComponent,
    providers: [
      {
        provide: ROUTER_SERVICE_TOKEN,
        useFactory: () => router,
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

  it('should have game rules', () => {
    expect(spectator.query('[data-testid="game-rules"]')?.textContent).toContain('Cliquez sur une cellule pour l\'allumer ou l\'éteindre. Attention, ses voisines changent aussi d\'état. Allumez toute la grille pour gagner.');
  });

  it('should have play button', () => {
    spectator.click('[data-testid="play-button"]');

    expect(router.lastNavigatedPath).toEqual('game');
    expect(spectator.query('[data-testid="play-button"]')?.textContent).toContain('Jouer');
  });

  it('should have trophies button', () => {
    spectator.click('[data-testid="trophies-button"]');

    expect(router.lastNavigatedPath).toEqual('trophies');
    expect(spectator.query('[data-testid="trophies-button"]')?.textContent).toContain('Trophées');
  });
});
