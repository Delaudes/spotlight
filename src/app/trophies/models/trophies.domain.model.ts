import { CellDomainModel, GridDomainModel } from "../../game/models/game.domain.model";

export enum Trophy {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
    EXPERT = 'EXPERT',
    MASTER = 'MASTER',
    BEGINNER_EXOTIC = 'BEGINNER_EXOTIC',
    INTERMEDIATE_EXOTIC = 'INTERMEDIATE_EXOTIC',
    ADVANCED_EXOTIC = 'ADVANCED_EXOTIC',
    EXPERT_EXOTIC = 'EXPERT_EXOTIC',
    MASTER_EXOTIC = 'MASTER_EXOTIC'
}

export const TROPHIES = new Map<Trophy, GridDomainModel>([
    [Trophy.BEGINNER, createSpotlightGrid(3, 1)],
    [Trophy.INTERMEDIATE, createSpotlightGrid(4, 1)],
    [Trophy.ADVANCED, createSpotlightGrid(5, 1)],
    [Trophy.EXPERT, createSpotlightGrid(6, 1)],
    [Trophy.MASTER, createSpotlightGrid(7, 1)],
    [Trophy.BEGINNER_EXOTIC, createSpotlightGrid(3, 1)],
    [Trophy.INTERMEDIATE_EXOTIC, createSpotlightGrid(4, 1)],
    [Trophy.ADVANCED_EXOTIC, createSpotlightGrid(5, 1)],
    [Trophy.EXPERT_EXOTIC, createSpotlightGrid(6, 1)],
    [Trophy.MASTER_EXOTIC, createSpotlightGrid(7, 1)]
]);

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