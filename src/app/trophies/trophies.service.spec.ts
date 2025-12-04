import { CellDomainModel, GridDomainModel } from "../game/models/game.domain.model";
import { FakeSignalService } from "../signal/fake-signal.service";
import { FakeStorageService } from "../storage/fake-storage.service";
import { TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophiesViewModel } from "./models/trophies.view.model";
import { TrophiesPresenter } from "./trophies.presenter";
import { TrophiesService } from "./trophies.service";
import { TrophiesView } from "./trophies.view";

describe('TrophiesService', () => {
    let service: TrophiesService;
    let storage: FakeStorageService;
    let view: TrophiesView;

    beforeEach(() => {
        storage = new FakeStorageService();
        view = new TrophiesView(new FakeSignalService<TrophiesViewModel>());
        service = new TrophiesService(storage, new TrophiesPresenter(view));
    });

    it('should return trophy unlocked', () => {
        const trophy = service.getUnlockedTrophyTitle(new GridDomainModel(
            [
                [new CellDomainModel(0, 0, 1), new CellDomainModel(0, 1, 1), new CellDomainModel(0, 2, 1)],
                [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
                [new CellDomainModel(2, 0, 1), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 1)],
            ], 1));

        expect(trophy).toEqual(TrophyTitleDomainModel.BEGINNER)
    });

    it('should return no trophy', () => {
        const trophy = service.getUnlockedTrophyTitle(new GridDomainModel(
            [
                [new CellDomainModel(0, 0, 1), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 1)],
                [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
                [new CellDomainModel(2, 0, 1), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 1)],
            ], 1));

        expect(trophy).toBeUndefined();
    });

    it('should return no trophy already unlocked', () => {
        service.unlockTrophy(TrophyTitleDomainModel.BEGINNER);

        const trophy = service.getUnlockedTrophyTitle(new GridDomainModel(
            [
                [new CellDomainModel(0, 0, 1), new CellDomainModel(0, 1, 1), new CellDomainModel(0, 2, 1)],
                [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
                [new CellDomainModel(2, 0, 1), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 1)],
            ], 1));

        expect(trophy).toBeUndefined();
    });

    it('should store unlocked trophy', () => {
        const trophy = TrophyTitleDomainModel.BEGINNER;

        service.unlockTrophy(trophy);

        expect(storage.store.get('trophies')).toEqual([trophy]);
    });

    it('should add another unlocked trophy', () => {
        const key = 'trophies';
        const trophy = TrophyTitleDomainModel.BEGINNER;
        const anotherTrophy = TrophyTitleDomainModel.INTERMEDIATE;
        storage.setItem<TrophyTitleDomainModel[]>(key, [trophy]);

        service.unlockTrophy(anotherTrophy);

        expect(storage.store.get(key)).toEqual([trophy, anotherTrophy]);
    })

    it('should load none trophies', () => {
        service.loadTrophies();

        expect(view.viewModel.get().trophies).toEqual([]);
    })

    it('should load some trophies', () => {
        storage.setItem<TrophyTitleDomainModel[]>('trophies', [
            TrophyTitleDomainModel.BEGINNER,
            TrophyTitleDomainModel.INTERMEDIATE_EXOTIC
        ]);

        service.loadTrophies();

        expect(view.viewModel.get().trophies).toEqual([
            {
                title: 'Débutant',
                grid: [
                    [{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 1 }],
                    [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                    [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]
                ]
            },
            {
                title: 'Intermédiaire Exotique',
                grid: [
                    [{ x: 0, y: 0, lightLevel: 2 }, { x: 0, y: 1, lightLevel: 2 }, { x: 0, y: 2, lightLevel: 2 }, { x: 0, y: 3, lightLevel: 2 }],
                    [{ x: 1, y: 0, lightLevel: 2 }, { x: 1, y: 1, lightLevel: 2 }, { x: 1, y: 2, lightLevel: 2 }, { x: 1, y: 3, lightLevel: 2 }],
                    [{ x: 2, y: 0, lightLevel: 2 }, { x: 2, y: 1, lightLevel: 2 }, { x: 2, y: 2, lightLevel: 2 }, { x: 2, y: 3, lightLevel: 2 }],
                    [{ x: 3, y: 0, lightLevel: 2 }, { x: 3, y: 1, lightLevel: 2 }, { x: 3, y: 2, lightLevel: 2 }, { x: 3, y: 3, lightLevel: 2 }]
                ]
            }
        ]);
    });
});