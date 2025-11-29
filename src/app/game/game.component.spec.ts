import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { GameComponent } from './game.component';
import { LightMode } from './models/game.view.model';

describe('GameComponent', () => {
  let spectator: Spectator<GameComponent>;

  const createComponent = createComponentFactory({
    component: GameComponent,
  });

  beforeEach(() => {
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
    spectator.click(`[data-testid="light-mode-${LightMode.EXOTIC}"]`);

    winAlternativeGridSize3();

    expect(spectator.query('[data-testid="victory-message"]')?.textContent).toContain('Félicitations ! Vous avez allumé toute la grille !');
  })

  it('should have victory message', () => {
    expect(spectator.query('[data-testid="victory-message"]')).toBeFalsy();

    winGridSize3();

    expect(spectator.query('[data-testid="victory-message"]')?.textContent).toContain('Félicitations ! Vous avez allumé toute la grille !');
  })

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
