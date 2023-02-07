import { TestBed } from '@angular/core/testing';

import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('expect loadCharacters to return api data search by angular', async () => {
    const response = await service.loadCharacters('angular');
    expect(response[0].id).toBe(24195339)
  });

  it('given invalid input should return error', async () => {
    const response = await service.loadCharacters('');
    expect(response).toBe('Invalid value')
  });
});
