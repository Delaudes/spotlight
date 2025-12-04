import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrophiesController } from './trophies.controller';
import { TrophiesView } from './trophies.view';

@Component({
  selector: 'app-trophies',
  imports: [],
  templateUrl: './trophies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrophiesComponent {
  private readonly view = inject(TrophiesView);
  protected readonly controller = inject(TrophiesController);

  protected get viewModel() {
    return this.view.viewModel.get();
  }
}
