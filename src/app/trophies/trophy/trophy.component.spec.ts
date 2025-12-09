import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TROPHIES_VIEW_MOCK } from '../models/trophies.mock';
import { TrophyComponent } from './trophy.component';

describe('TrophyComponent', () => {
    let spectator: Spectator<TrophyComponent>;
    const createComponent = createComponentFactory(TrophyComponent);

    beforeEach(() => {
        spectator = createComponent(
            {
                props: {
                    trophy: TROPHIES_VIEW_MOCK[0]
                }
            });
    });

    it('should have cells', () => {
        expect(spectator.queryAll('[data-testid="cell"]').length).toEqual(spectator.component.trophy().grid.flat().length);
    });

    it('should have title', () => {
        expect(spectator.query('[data-testid="trophy-title"]')?.textContent).toContain(spectator.component.trophy().title);
    });
});
