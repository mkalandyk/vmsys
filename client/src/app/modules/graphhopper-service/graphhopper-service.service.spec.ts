import { TestBed } from '@angular/core/testing';

import { GraphhopperServiceService } from './graphhopper-service.service';

describe('GraphhopperServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphhopperServiceService = TestBed.get(GraphhopperServiceService);
    expect(service).toBeTruthy();
  });
});
