import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINT, STATICENDPOINT } from "../index"

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    constructor(private http: HttpClient) { }

    // Method to get headers including the token
    private getHeaders(token: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    // GET request without query params, with token
    get<T>(name: string): Observable<T> {
        return this.http.get<T>(`${ENDPOINT}/${name}`);
    }

    // GET request with query params, with token
    getWithQuery<T>(name: string, queryParams: any): Observable<T> {
        let params = new HttpParams();

        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key)) {
                params = params.append(key, queryParams[key]);
            }
        }
        return this.http.get<T>(`${ENDPOINT}/${name}`, { params });
    }

    // POST request, with token
    post<T>(name: string, data: any): Observable<T> {
        return this.http.post<T>(`${ENDPOINT}/${name}`, data);
    }

    // PUT request, with token
    put<T>(name: string, data: any): Observable<T> {
        return this.http.put<T>(`${ENDPOINT}/${name}`, data);
    }

    // DELETE request, with token
    delete<T>(name: string): Observable<T> {
        return this.http.delete<T>(`${ENDPOINT}/${name}`);
    }
}
