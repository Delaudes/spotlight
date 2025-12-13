import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TrophyTitleViewModel } from '../models/trophies.view.model';
import { TrophyComponent } from './trophy.component';

describe('TrophyComponent', () => {
    let spectator: Spectator<TrophyComponent>;
    const createComponent = createComponentFactory(TrophyComponent);

    beforeEach(() => {
        spectator = createComponent(
            {
                props: {
                    trophy: {
                        title: TrophyTitleViewModel.BEGINNER,
                        grid: [
                            [{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 1 }],
                            [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                            [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]
                        ],
                        unlocked: true
                    },
                }
            });
    });

    it('should have cells', () => {
        expect(spectator.queryAll('[data-testid="cell"]').length).toEqual(spectator.component.trophy().grid.flat().length);
    });

    it('should have title', () => {
        expect(spectator.query('[data-testid="trophy-title"]')?.textContent).toContain(spectator.component.trophy().title);
        expect(spectator.query('[data-testid="trophy-locked"]')).toBeNull();
    });

    it('should have lock', () => {
        spectator.setInput('trophy', {
            title: TrophyTitleViewModel.BEGINNER,
            grid: [
                [{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 1 }],
                [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]
            ],
            unlocked: false
        });

        expect(spectator.query('[data-testid="trophy-title"]')).toBeNull();
        expect(spectator.query('[data-testid="trophy-locked"]')).toBeDefined();
    });
});
