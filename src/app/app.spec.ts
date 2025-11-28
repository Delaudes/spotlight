import { RouterOutlet } from '@angular/router';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { App } from './app';

describe('App', () => {
  let spectator: Spectator<App>;

  const createComponent = createComponentFactory({
    component: App,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should have router outlet', () => {
    expect(spectator.query(RouterOutlet)).toBeTruthy();
  });
});
