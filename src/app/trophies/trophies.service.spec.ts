import { FakeSignalService } from "../signal/fake-signal.service";
import { FakeStorageService } from "../storage/fake-storage.service";
import { STORAGE_KEY, TrophyTitleDomainModel } from "./models/trophies.domain.model";
import { TrophiesViewModel, TrophyTitleViewModel } from "./models/trophies.view.model";
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

    it('should load trophies', () => {
        storage.setItem<TrophyTitleDomainModel[]>(STORAGE_KEY, [
            TrophyTitleDomainModel.BEGINNER,
            TrophyTitleDomainModel.INTERMEDIATE_EXOTIC
        ]);

        service.loadTrophies();

        expect(view.viewModel.get().trophies).toEqual([
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
            createBullseyeTrophy(TrophyTitleViewModel.MASTER_EXOTIC_BULLSEYE, 7, 2, false),
            createFrameTrophy(TrophyTitleViewModel.BEGINNER_FRAME, 3, 1, false),
            createFrameTrophy(TrophyTitleViewModel.INTERMEDIATE_FRAME, 4, 1, false),
            createFrameTrophy(TrophyTitleViewModel.ADVANCED_FRAME, 5, 1, false),
            createFrameTrophy(TrophyTitleViewModel.EXPERT_FRAME, 6, 1, false),
            createFrameTrophy(TrophyTitleViewModel.MASTER_FRAME, 7, 1, false),
            createFrameTrophy(TrophyTitleViewModel.BEGINNER_EXOTIC_FRAME, 3, 2, false),
            createFrameTrophy(TrophyTitleViewModel.INTERMEDIATE_EXOTIC_FRAME, 4, 2, false),
            createFrameTrophy(TrophyTitleViewModel.ADVANCED_EXOTIC_FRAME, 5, 2, false),
            createFrameTrophy(TrophyTitleViewModel.EXPERT_EXOTIC_FRAME, 6, 2, false),
            createFrameTrophy(TrophyTitleViewModel.MASTER_EXOTIC_FRAME, 7, 2, false)
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

    function createFrameTrophy(title: TrophyTitleViewModel, size: number, cellMaxLevel: number, unlocked: boolean) {
        const grid = [];
        for (let x = 0; x < size; x++) {
            const row = [];
            for (let y = 0; y < size; y++) {
                const isEdge = x === 0 || x === size - 1 || y === 0 || y === size - 1;
                const lightLevel = isEdge ? cellMaxLevel : 0;
                row.push({ x, y, lightLevel });
            }
            grid.push(row);
        }
        return { title, grid, unlocked };
    }
});