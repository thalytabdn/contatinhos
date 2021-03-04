import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Contato } from '../models/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {
  
  url = 'http://localhost:3000/contatos';
  
  constructor(private httpClient: HttpClient) { }

  //retorna em ordem alfabética
  getAll(): Observable<Contato[]>{
    return this.httpClient.get<Contato[]>(this.url+'?_sort=nome&_order=asc')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getContato(id: number):Observable<Contato>{
    return this.httpClient.get<Contato>(this.url + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  saveContato(contato: Contato): Observable<Contato> {
    return this.httpClient.post<Contato>(this.url, JSON.stringify(contato), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateContato(contato: Contato): Observable<Contato>{
    return this.httpClient.put<Contato>(this.url + '/' + contato.id, JSON.stringify(contato),this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteContato(contato: Contato){
    return this.httpClient.delete<Contato>(this.url + '/' + contato.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
