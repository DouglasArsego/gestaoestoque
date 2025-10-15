import { TestBed } from '@angular/core/testing';

import { Movimentacao } from './movimentacao';

describe('Movimentacao', () => {
  let service: Movimentacao;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movimentacao);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
