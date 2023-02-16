import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  @ViewChild('charactersList') charactersList!: ElementRef;

  constructor(private httpClient: HttpClient) {}

  async loadCharacters(inputSearchValue: string, page: number) {
    if (inputSearchValue === '') {
      return 'Invalid value';
    }

    const request = await this.httpClient
      .get<any>(
        `https://rickandmortyapi.com/api/character/?page=${page}&name=${inputSearchValue}`
      )
      .toPromise();

    setTimeout(() => {
      const charactersList = document.getElementById('charactersList');
      if (charactersList) {
        window.scrollTo(0, 830);
      }
    }, 10);

    console.log(request);
    return request.results;
  }
}
