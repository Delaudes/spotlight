import { FakeSignalService } from "../signal/fake-signal.service";
import { FakeStorageService } from "../storage/fake-storage.service";
import { STORAGE_KEY, TrophyTitleDomainModel } from "../trophies/models/trophies.domain.model";
import { GamePresenter } from "./game.presenter";
import { GameService } from "./game.service";
import { GameView } from "./game.view";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { GameViewModel, LightModeViewModel } from "./models/game.view.model";

describe('GameService', () => {
    let service: GameService;
    let view: GameView;
    let storage: FakeStorageService;

    beforeEach(() => {
        storage = new FakeStorageService();
        view = new GameView(new FakeSignalService<GameViewModel>());
        service = new GameService(new GamePresenter(view), storage);
    });

    it('should update grid', () => {
        view.update({
            grid: {
                cells: [[{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 1 }],
                [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]],
                spotlight: true,
                size: 3,
                sizeOptions: [3, 4, 5, 6, 7],
                lightMode: LightModeViewModel.CLASSIC,
                lightModeOptions: [LightModeViewModel.CLASSIC, LightModeViewModel.EXOTIC]
            }
        });

        service.updateGrid(5, 2);

        expect(view.viewModel.get().grid.size).toBe(5);
        expect(view.viewModel.get().grid.cells.length).toBe(5);
        expect(view.viewModel.get().grid.cells.flat().length).toBe(25);
        expect(view.viewModel.get().grid.spotlight).toBe(false);
        expect(view.viewModel.get().grid.lightMode).toBe(LightModeViewModel.EXOTIC);
    });

    it('should play cell : left and up neighbors not evolve', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 0), new CellDomainModel(1, 2, 0)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 0), new CellDomainModel(2, 2, 0)],
        ], 1), new CellDomainModel(0, 0, 0));

        expect(view.viewModel.get().grid.cells[0][0].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[0][1].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[1][0].lightLevel).toBe(1);
    });

    it('should play cell : right and down neighbors not evolve', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 0), new CellDomainModel(1, 2, 0)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 0), new CellDomainModel(2, 2, 0)],
        ], 1), new CellDomainModel(2, 2, 0));

        expect(view.viewModel.get().grid.cells[2][2].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[2][1].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[1][2].lightLevel).toBe(1);
    });

    it('should play cell : spotlight', () => {
        view.update({
            grid: {
                cells: [[{ x: 0, y: 0, lightLevel: 0 }, { x: 0, y: 1, lightLevel: 0 }, { x: 0, y: 2, lightLevel: 1 }],
                [{ x: 1, y: 0, lightLevel: 0 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]],
                spotlight: false,
                size: 3,
                sizeOptions: [3, 4, 5, 6, 7],
                lightMode: LightModeViewModel.CLASSIC,
                lightModeOptions: [LightModeViewModel.CLASSIC, LightModeViewModel.EXOTIC]
            }
        });

        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 1)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
            [new CellDomainModel(2, 0, 1), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 1)],
        ], 1), new CellDomainModel(0, 0, 0));

        expect(view.viewModel.get().grid.spotlight).toBe(true);
        expect(view.viewModel.get().grid.cells[0][0].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[0][1].lightLevel).toBe(1);
        expect(view.viewModel.get().grid.cells[1][0].lightLevel).toBe(1);
    });

    it('should play cell : exotic spotlight', () => {
        view.update({
            grid: {
                cells: [[{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 2 }],
                [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 2 }, { x: 1, y: 2, lightLevel: 2 }],
                [{ x: 2, y: 0, lightLevel: 2 }, { x: 2, y: 1, lightLevel: 2 }, { x: 2, y: 2, lightLevel: 2 }]],
                spotlight: false,
                size: 3,
                sizeOptions: [3, 4, 5, 6, 7],
                lightMode: LightModeViewModel.EXOTIC,
                lightModeOptions: [LightModeViewModel.CLASSIC, LightModeViewModel.EXOTIC]
            }
        });

        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 1), new CellDomainModel(0, 1, 1), new CellDomainModel(0, 2, 2)],
            [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 2), new CellDomainModel(1, 2, 2)],
            [new CellDomainModel(2, 0, 2), new CellDomainModel(2, 1, 2), new CellDomainModel(2, 2, 2)],
        ], 2), new CellDomainModel(0, 0, 1));

        expect(view.viewModel.get().grid.spotlight).toBe(true);
        expect(view.viewModel.get().grid.cells[0][0].lightLevel).toBe(2);
        expect(view.viewModel.get().grid.cells[0][1].lightLevel).toBe(2);
        expect(view.viewModel.get().grid.cells[1][0].lightLevel).toBe(2);
    })

    it('should reset cell light level correctly', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 2), new CellDomainModel(0, 1, 2), new CellDomainModel(0, 2, 2)],
            [new CellDomainModel(1, 0, 2), new CellDomainModel(1, 1, 2), new CellDomainModel(1, 2, 2)],
            [new CellDomainModel(2, 0, 2), new CellDomainModel(2, 1, 2), new CellDomainModel(2, 2, 2)],
        ], 2), new CellDomainModel(1, 1, 2));

        expect(view.viewModel.get().grid.cells[1][1].lightLevel).toBe(0);
        expect(view.viewModel.get().grid.cells[0][1].lightLevel).toBe(0);
        expect(view.viewModel.get().grid.cells[1][0].lightLevel).toBe(0);
        expect(view.viewModel.get().grid.cells[1][2].lightLevel).toBe(0);
        expect(view.viewModel.get().grid.cells[2][1].lightLevel).toBe(0);
    });

    it('should return updated grid on play', () => {
        const updatedGrid = service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 0), new CellDomainModel(1, 2, 0)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 0), new CellDomainModel(2, 2, 0)],
        ], 1), new CellDomainModel(1, 1, 0));

        expect(updatedGrid).toEqual(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 1), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 0)],
        ], 1));
    });

    describe('getUnlockedTrophyTitle', () => {
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
    });

    describe('unlockTrophy', () => {
        it('should store unlocked trophy', () => {
            const trophy = TrophyTitleDomainModel.BEGINNER;

            service.unlockTrophy(trophy);

            expect(storage.store.get(STORAGE_KEY)).toEqual([trophy]);
        });

        it('should display unlocked trophy', () => {
            expect(view.viewModel.get().nbNewTrophies).toEqual(0);
            expect(view.viewModel.get().hasNewTrophies).toBe(false);

            const trophy = TrophyTitleDomainModel.BEGINNER;

            service.unlockTrophy(trophy);

            expect(view.viewModel.get().nbNewTrophies).toEqual(1);
            expect(view.viewModel.get().hasNewTrophies).toBe(true);
        })

        it('should add another unlocked trophy', () => {
            const trophy = TrophyTitleDomainModel.BEGINNER;
            const anotherTrophy = TrophyTitleDomainModel.INTERMEDIATE;
            storage.setItem<TrophyTitleDomainModel[]>(STORAGE_KEY, [trophy]);

            service.unlockTrophy(anotherTrophy);

            expect(storage.store.get(STORAGE_KEY)).toEqual([trophy, anotherTrophy]);
        });
    });
});