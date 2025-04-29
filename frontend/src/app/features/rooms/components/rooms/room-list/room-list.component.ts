import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-room-list',
  imports: [],
  templateUrl: './room-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomListComponent { }
