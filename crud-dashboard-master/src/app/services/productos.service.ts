import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductoModel} from "../models/ProductoModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  baseUrl = environment.services.baseUrl;
  id = environment.services.id;

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  GetProducts(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(this.baseUrl);
  }

  // GET
  GetProduct(id): Observable<ProductoModel> {
    return this.http.get<ProductoModel>(this.baseUrl + this.id.replace('#id', id));
  }

  // POST
  CreateProduct(data): Observable<ProductoModel> {
    return this.http.post<ProductoModel>(this.baseUrl, JSON.stringify(data), this.httpOptions);
  }

  // PUT
  UpdateProduct(id, data): Observable<any> {
    return this.http.put<any>(this.baseUrl + this.id.replace('#id', id), JSON.stringify(data), this.httpOptions);
  }

  // DELETE
  DeletePerson(id) {
    return this.http.delete<ProductoModel>(this.baseUrl + this.id.replace('#id', id), this.httpOptions);
  }

}
