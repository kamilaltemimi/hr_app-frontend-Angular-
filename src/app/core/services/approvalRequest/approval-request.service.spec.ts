import { TestBed } from '@angular/core/testing';

import { ApprovalRequestService } from './approval-request.service';

describe('ApprovalRequestService', () => {
  let service: ApprovalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
