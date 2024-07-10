import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { IGame } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { GameFormComponent } from '../game-form/game-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    GameFormComponent
  ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent implements OnChanges{
  @Input() itemList: IGame[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IGame = {};
  public gameService: GameService = inject(GameService);

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }
  
  showDetailModal(item: IGame, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IGame) {
    this.gameService.update(item);
  }

  deleteGame(item: IGame) {
    this.gameService.delete(item);
  }

}
