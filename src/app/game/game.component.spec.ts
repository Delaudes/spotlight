import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { FakeRouterService } from '../router/fake-router.service';
import { ROUTER_SERVICE_TOKEN } from '../router/router.service';
import { FakeStorageService } from '../storage/fake-storage.service';
import { STORAGE_SERVICE_TOKEN } from '../storage/storage.service';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let spectator: Spectator<GameComponent>;
  let router: FakeRouterService;

  const createComponent = createComponentFactory({
    component: GameComponent,
    providers: [
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

  it('should have trophies button', () => {
    spectator.click('[data-testid="trophies-button"]');

    expect(router.lastNavigatedPath).toEqual('trophies');
  });

  it('should have home button', () => {
    spectator.click('[data-testid="home-button"]');

    expect(router.lastNavigatedPath).toEqual('');
  });

  it('should have reset button', () => {
    spectator.click('[data-testid="reset-button"]');
    // Comment tester ca ?
  });
});
