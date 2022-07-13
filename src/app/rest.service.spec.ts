import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import { of } from 'rxjs';
import { mockProducts } from './rest.mock.spec';

describe('RestService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService]
    });

    // inject the service
    service = TestBed.inject(RestService);
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  });

  it('should return the list of product', () => {
    const spy = spyOn(service, 'getProducts').and.returnValue(
      of(mockProducts)
    );

    // act
    service.getProducts().subscribe(data => {
      expect(data).toBe(mockProducts);
    });

    // assert
    expect(spy).toHaveBeenCalled();
  });

it('should return the product given product id', () => {
    const spy = spyOn(service, 'getProductById').and.returnValue(
      of(mockProducts[0])
    );

    // act
    service.getProductById(1).subscribe(data => {
      expect(data.id).toBe(1);
    });

    // assert
    expect(spy).toHaveBeenCalled();
});
  
});
