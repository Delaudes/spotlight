import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeController } from './home.controller';
import { HOME_PROVIDER } from './home.provider';
import { HomeView } from './home.view';

@Component({
  selector: 'app-home',
  imports: [],
  providers: [HOME_PROVIDER],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly homeView = inject(HomeView);
  protected readonly homeController = inject(HomeController);

  get viewModel() {
    return this.homeView.homeViewModel.get();
  }
}
