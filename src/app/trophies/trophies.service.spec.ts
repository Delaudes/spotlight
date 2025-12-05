import { FakeSignalService } from "../signal/fake-signal.service";
import { FakeStorageService } from "../storage/fake-storage.service";
import { STORAGE_KEY, TrophyTitleDomainModel } from "./models/trophies.domain.model";
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

    it('should load none trophies', () => {
        service.loadTrophies();

        expect(view.viewModel.get().trophies).toEqual([]);
    })

    it('should load some trophies', () => {
        storage.setItem<TrophyTitleDomainModel[]>(STORAGE_KEY, [
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