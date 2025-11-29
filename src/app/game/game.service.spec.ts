import { FakeSignalService } from "../signal/fake-signal.service";
import { GamePresenter } from "./game.presenter";
import { GameService } from "./game.service";
import { GameView } from "./game.view";
import { CellDomainModel, GridDomainModel } from "./models/game.domain.model";
import { GameViewModel, LightMode } from "./models/game.view.model";

describe('GameService', () => {
    let service: GameService;
    let view: GameView;

    beforeEach(() => {
        view = new GameView(new FakeSignalService<GameViewModel>());
        service = new GameService(new GamePresenter(view));
    });

    it('should modify grid', () => {
        view.update({
            grid: {
                cells: [[{ x: 0, y: 0, lightLevel: 1 }, { x: 0, y: 1, lightLevel: 1 }, { x: 0, y: 2, lightLevel: 1 }],
                [{ x: 1, y: 0, lightLevel: 1 }, { x: 1, y: 1, lightLevel: 1 }, { x: 1, y: 2, lightLevel: 1 }],
                [{ x: 2, y: 0, lightLevel: 1 }, { x: 2, y: 1, lightLevel: 1 }, { x: 2, y: 2, lightLevel: 1 }]],
                spotlight: true,
                size: 3,
                sizeOptions: [3, 4, 5, 6, 7],
                lightMode: LightMode.CLASSIC,
                lightModeOptions: [LightMode.CLASSIC, LightMode.EXOTIC]
            }
        });

        service.modifyGrid(5, 2);

        expect(view.gameViewModel.get().grid.size).toBe(5);
        expect(view.gameViewModel.get().grid.cells.length).toBe(5);
        expect(view.gameViewModel.get().grid.cells.flat().length).toBe(25);
        expect(view.gameViewModel.get().grid.spotlight).toBe(false);
        expect(view.gameViewModel.get().grid.lightMode).toBe(LightMode.EXOTIC);
    });

    it('should play cell : left and up neighbors not evolve', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 0), new CellDomainModel(1, 2, 0)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 0), new CellDomainModel(2, 2, 0)],
        ], 1), new CellDomainModel(0, 0, 0));

        expect(view.gameViewModel.get().grid.cells[0][0].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[0][1].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[1][0].lightLevel).toBe(1);
    });

    it('should play cell : right and down neighbors not evolve', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 0)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 0), new CellDomainModel(1, 2, 0)],
            [new CellDomainModel(2, 0, 0), new CellDomainModel(2, 1, 0), new CellDomainModel(2, 2, 0)],
        ], 1), new CellDomainModel(2, 2, 0));

        expect(view.gameViewModel.get().grid.cells[2][2].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[2][1].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[1][2].lightLevel).toBe(1);
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
                lightMode: LightMode.CLASSIC,
                lightModeOptions: [LightMode.CLASSIC, LightMode.EXOTIC]
            }
        });

        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 0), new CellDomainModel(0, 1, 0), new CellDomainModel(0, 2, 1)],
            [new CellDomainModel(1, 0, 0), new CellDomainModel(1, 1, 1), new CellDomainModel(1, 2, 1)],
            [new CellDomainModel(2, 0, 1), new CellDomainModel(2, 1, 1), new CellDomainModel(2, 2, 1)],
        ], 1), new CellDomainModel(0, 0, 0));

        expect(view.gameViewModel.get().grid.spotlight).toBe(true);
        expect(view.gameViewModel.get().grid.cells[0][0].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[0][1].lightLevel).toBe(1);
        expect(view.gameViewModel.get().grid.cells[1][0].lightLevel).toBe(1);
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
                lightMode: LightMode.EXOTIC,
                lightModeOptions: [LightMode.CLASSIC, LightMode.EXOTIC]
            }
        });

        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 1), new CellDomainModel(0, 1, 1), new CellDomainModel(0, 2, 2)],
            [new CellDomainModel(1, 0, 1), new CellDomainModel(1, 1, 2), new CellDomainModel(1, 2, 2)],
            [new CellDomainModel(2, 0, 2), new CellDomainModel(2, 1, 2), new CellDomainModel(2, 2, 2)],
        ], 2), new CellDomainModel(0, 0, 1));

        expect(view.gameViewModel.get().grid.spotlight).toBe(true);
        expect(view.gameViewModel.get().grid.cells[0][0].lightLevel).toBe(2);
        expect(view.gameViewModel.get().grid.cells[0][1].lightLevel).toBe(2);
        expect(view.gameViewModel.get().grid.cells[1][0].lightLevel).toBe(2);
    })

    it('should reset cell light level correctly', () => {
        service.play(new GridDomainModel([
            [new CellDomainModel(0, 0, 2), new CellDomainModel(0, 1, 2), new CellDomainModel(0, 2, 2)],
            [new CellDomainModel(1, 0, 2), new CellDomainModel(1, 1, 2), new CellDomainModel(1, 2, 2)],
            [new CellDomainModel(2, 0, 2), new CellDomainModel(2, 1, 2), new CellDomainModel(2, 2, 2)],
        ], 2), new CellDomainModel(1, 1, 2));

        expect(view.gameViewModel.get().grid.cells[1][1].lightLevel).toBe(0);
        expect(view.gameViewModel.get().grid.cells[0][1].lightLevel).toBe(0);
        expect(view.gameViewModel.get().grid.cells[1][0].lightLevel).toBe(0);
        expect(view.gameViewModel.get().grid.cells[1][2].lightLevel).toBe(0);
        expect(view.gameViewModel.get().grid.cells[2][1].lightLevel).toBe(0);
    });
});