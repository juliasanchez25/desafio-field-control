import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  constructor(private httpClient: HttpClient) {}

  async loadCharacters(inputSearchValue: string) {
    if (inputSearchValue === '') {
      return 'Invalid value';
    }
    const request = await this.httpClient
      .get<any>(
        `https://rickandmortyapi.com/api/character/?name=${inputSearchValue}`
      )
      .toPromise();
    console.log(request)
    return request.results;
  }
}
