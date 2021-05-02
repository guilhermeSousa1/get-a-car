import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MockModule, MockProvider } from 'ng-mocks';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const mockOpen = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule(MatSnackBarModule)
      ],
      providers: [
        NotificationService,
        MockProvider(MatSnackBar, {
          open: mockOpen
        })
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call SnackBar service', () => {
    const errorMessage = 'This is my cool error message';

    service.showError(errorMessage);

    expect(mockOpen).toHaveBeenCalledTimes(1);
    expect(mockOpen).toHaveBeenCalledWith(errorMessage, expect.anything(), expect.anything());
  });
});
