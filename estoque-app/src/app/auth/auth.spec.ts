
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should expose sendMagicLink method', () => {
    expect(typeof service.sendMagicLink).toBe('function');
  });

  it('should expose getSession method', () => {
    expect(typeof service.getSession).toBe('function');
  });
});
