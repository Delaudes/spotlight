import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { TrophiesComponent } from './trophies/trophies.component';

export enum Path {
    Home = '',
    Game = 'game',
    Trophies = 'trophies'
}


export const routes: Routes = [
    {
        path: Path.Home,
        component: HomeComponent
    },
    {
        path: Path.Game,
        component: GameComponent
    },
    {
        path: Path.Trophies,
        component: TrophiesComponent
    }
];
