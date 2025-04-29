import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-movie-form',
  imports: [],
  templateUrl: './movie-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormComponent { }
