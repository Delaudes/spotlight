import { path } from "../app.routes";
import { RouterService } from "../router/router.service";
import { GamePresenter } from "./game.presenter";
import { CellViewModel } from "./models/game.view.model";

export class GameController {
    constructor(private readonly routerService: RouterService, private readonly gamePresenter: GamePresenter) { }

    navigateToHome(): void {
        this.routerService.navigateTo(path.home);
    }

    play(cell: CellViewModel, gridSize: number) {
        const cellsToModify = [
            { x: cell.x, y: cell.y },
            { x: cell.x + 1, y: cell.y },
            { x: cell.x - 1, y: cell.y },
            { x: cell.x, y: cell.y + 1 },
            { x: cell.x, y: cell.y - 1 },
        ].filter(cell => this.isValidCell(cell, gridSize));
        this.gamePresenter.presentCells(cellsToModify);
    }

    private isValidCell(cell: { x: number, y: number }, gridSize: number): boolean {
        return cell.x >= 0 && cell.x < gridSize && cell.y >= 0 && cell.y < gridSize;
    }
}