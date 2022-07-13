import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

export interface Product {
  id: number;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
}

const endpoint = 'https://fuschia-canyon-frame.glitch.me/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(endpoint + 'products').pipe(
      catchError(this.handleError<any>('getProducts'))
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(endpoint + 'products/' + id).pipe(
      catchError(this.handleError<any>('getProductById'))
    );
  }

  addProduct (product: Omit<Product, 'id'>): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
      tap((productItem) => console.log(`added product w/ id=${productItem.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateProduct (id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(productItem => console.log(`updated product id=${productItem.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id: number): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
