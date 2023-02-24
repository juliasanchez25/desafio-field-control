import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CharacterService } from 'src/app/services/character.service';
import {
  faMagnifyingGlass,
  faArrowUp,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

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
  public arrowIcon = faArrowUp;
  public leftArrowIcon = faArrowLeft;
  public rightArrowIcon = faArrowRight;
  public navbarColor = 'transparent';
  public page: number = 1;

  @ViewChild('search') search!: ElementRef;
  @ViewChild('navbar') navbarRef!: ElementRef;

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
      const inputSearch = document.getElementById('inputSearch');
      if (inputSearch) {
        inputSearch.scrollIntoView({ behavior: 'smooth' });
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

  @HostListener('document:keyup.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    this.loadCharacters();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.pageYOffset > 50) {
      this.navbarColor = '#151515';
    } else {
      this.navbarColor = 'transparent';
    }
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
