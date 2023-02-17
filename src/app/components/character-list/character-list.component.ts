import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent {
  public inputSearchValue: string = '';
  public characters: any = [];
  public showSearchContainer = false;
  public showButtons = false;
  public searchIcon = faMagnifyingGlass;
  public page: number = 1;

  @ViewChild('search') search!: ElementRef;

  constructor(public readonly characterService: CharacterService) {}

  async loadCharacters() {
    this.page = 1;
    this.characters = await this.characterService.loadCharacters(
      this.inputSearchValue,
      this.page
    );

    if (this.characters.length > 0) {
      this.showButtons = true;
    }
  }

  moveToSearch(): void {
    this.showSearchContainer = true;
    setTimeout(() => {
      const search = document.getElementById('search');
      if (search) {
        search.scrollIntoView({ behavior: 'smooth' });
      }
    }, 20);
  }

  async nextPage() {
    this.page = this.page + 1;
    this.characters = await this.characterService.loadCharacters(
      this.inputSearchValue,
      this.page
    );
  }

  async previousPage() {
    this.page = this.page - 1;
    this.characters = await this.characterService.loadCharacters(
      this.inputSearchValue,
      this.page
    );
  }
}
