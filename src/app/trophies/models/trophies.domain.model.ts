import { CellDomainModel, GridDomainModel } from "../../game/models/game.domain.model";

export class TrophiesListDomainModel {
    constructor(public readonly trophies: TrophyDomainModel[]) { }
}

export class TrophyDomainModel {
    constructor(public readonly title: TrophyTitleDomainModel, public readonly grid: GridDomainModel) { }
}

export enum TrophyTitleDomainModel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
    EXPERT = 'EXPERT',
    MASTER = 'MASTER',
    BEGINNER_EXOTIC = 'BEGINNER_EXOTIC',
    INTERMEDIATE_EXOTIC = 'INTERMEDIATE_EXOTIC',
    ADVANCED_EXOTIC = 'ADVANCED_EXOTIC',
    EXPERT_EXOTIC = 'EXPERT_EXOTIC',
    MASTER_EXOTIC = 'MASTER_EXOTIC',
    BEGINNER_BULLSEYE = 'BEGINNER_BULLSEYE',
    ADVANCED_BULLSEYE = 'ADVANCED_BULLSEYE',
    MASTER_BULLSEYE = 'MASTER_BULLSEYE',
    BEGINNER_EXOTIC_BULLSEYE = 'BEGINNER_EXOTIC_BULLSEYE',
    ADVANCED_EXOTIC_BULLSEYE = 'ADVANCED_EXOTIC_BULLSEYE',
    MASTER_EXOTIC_BULLSEYE = 'MASTER_EXOTIC_BULLSEYE'
}


export const GRID_BY_TITLE: Record<TrophyTitleDomainModel, GridDomainModel> = {
    [TrophyTitleDomainModel.BEGINNER]: createSpotlightGrid(3, 1),
    [TrophyTitleDomainModel.INTERMEDIATE]: createSpotlightGrid(4, 1),
    [TrophyTitleDomainModel.ADVANCED]: createSpotlightGrid(5, 1),
    [TrophyTitleDomainModel.EXPERT]: createSpotlightGrid(6, 1),
    [TrophyTitleDomainModel.MASTER]: createSpotlightGrid(7, 1),
    [TrophyTitleDomainModel.BEGINNER_EXOTIC]: createSpotlightGrid(3, 2),
    [TrophyTitleDomainModel.INTERMEDIATE_EXOTIC]: createSpotlightGrid(4, 2),
    [TrophyTitleDomainModel.ADVANCED_EXOTIC]: createSpotlightGrid(5, 2),
    [TrophyTitleDomainModel.EXPERT_EXOTIC]: createSpotlightGrid(6, 2),
    [TrophyTitleDomainModel.MASTER_EXOTIC]: createSpotlightGrid(7, 2),
    [TrophyTitleDomainModel.BEGINNER_BULLSEYE]: createBullseyeGrid(3, 1),
    [TrophyTitleDomainModel.ADVANCED_BULLSEYE]: createBullseyeGrid(5, 1),
    [TrophyTitleDomainModel.MASTER_BULLSEYE]: createBullseyeGrid(7, 1),
    [TrophyTitleDomainModel.BEGINNER_EXOTIC_BULLSEYE]: createBullseyeGrid(3, 2),
    [TrophyTitleDomainModel.ADVANCED_EXOTIC_BULLSEYE]: createBullseyeGrid(5, 2),
    [TrophyTitleDomainModel.MASTER_EXOTIC_BULLSEYE]: createBullseyeGrid(7, 2)
};


export const TITLE_BY_GRID = new Map<string, TrophyTitleDomainModel>(
    Object.entries(GRID_BY_TITLE).map(([trophyTitle, grid]) => [JSON.stringify(grid), trophyTitle as TrophyTitleDomainModel])
);

function createSpotlightGrid(size: number, cellMaxLevel: number): GridDomainModel {
    const cells = [];
    for (let x = 0; x < size; x++) {
        const row = [];
        for (let y = 0; y < size; y++) {
            row.push(new CellDomainModel(x, y, cellMaxLevel));
        }
        cells.push(row);
    }
    return new GridDomainModel(cells, cellMaxLevel);
}

function createBullseyeGrid(size: number, cellMaxLevel: number): GridDomainModel {
    const cells = [];
    const center = Math.floor(size / 2);

    for (let x = 0; x < size; x++) {
        const row = [];
        for (let y = 0; y < size; y++) {
            // Le centre est allumé au maximum, tous les autres à 0
            const lightLevel = (x === center && y === center) ? cellMaxLevel : 0;
            row.push(new CellDomainModel(x, y, lightLevel));
        }
        cells.push(row);
    }
    return new GridDomainModel(cells, cellMaxLevel);
}

export const STORAGE_KEY = 'trophies';
