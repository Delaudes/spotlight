import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeController } from './home.controller';
import { HomeView } from './home.view';

@Component({
  selector: 'app-home',
  imports: [],
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
