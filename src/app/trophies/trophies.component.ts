import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrophiesController } from './trophies.controller';
import { TROPHIES_PROVIDER } from './trophies.provider';
import { TrophiesView } from './trophies.view';
import { TrophyComponent } from './trophy/trophy.component';

@Component({
  selector: 'app-trophies',
  imports: [TrophyComponent],
  providers: [TROPHIES_PROVIDER],
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
