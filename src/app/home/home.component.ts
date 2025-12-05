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
  private readonly view = inject(HomeView);
  protected readonly controller = inject(HomeController);

  protected get viewModel() {
    return this.view.viewModel.get();
  }
}
