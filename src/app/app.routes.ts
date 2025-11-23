import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

export enum path {
    home = '',
    game = 'game'
}


export const routes: Routes = [
    {
        path: path.home,
        component: HomeComponent
    },
    {
        path: path.game,
        component: GameComponent
    }
];
