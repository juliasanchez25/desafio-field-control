import { Component } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {
  public inputSearchValue: string = '';
  public characters: any = [];

  constructor(public readonly characterService: CharacterService) {}

  async loadCharacters() {
    console.log(this.inputSearchValue);
    this.characters = await this.characterService.loadCharacters(
      this.inputSearchValue
    );
  }
}
