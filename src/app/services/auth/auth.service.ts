import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINT } from "../index"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private userData = new BehaviorSubject<any>(null);
    private userIdSubject = new BehaviorSubject<number | null>(null);

    constructor(private http: HttpClient) {}
    
    login(email: string, password: string) {
        return this.http.post<{ accessToken: string, id: number }>(`${ENDPOINT}/auth/login`, {
            email,
            password,
        });
    }

    register(data: any) {
        return this.http.post(`${ENDPOINT}/auth/create`, { ...data });
    }

    logout() {
        localStorage.removeItem('authToken');
        this.userData.next(null);
    }

    setUserData(data: any) {
        this.userData.next(data); 
    }

    getUserData() {
        return this.userData.asObservable();
    }

    saveToken(token: string) {
        localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    setUserId(userId: number) {
        localStorage.setItem('userId', userId.toString());
        this.userIdSubject.next(userId);
    }

    getUserId(): number | null {
        const storedUserId = localStorage.getItem('userId');
        return storedUserId ? parseInt(storedUserId, 10) : null;
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    fetchUserData() {
        const token = this.getToken();
        const id = this.getUserId();
        
        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            return this.http.get(`${ENDPOINT}/auth/${id}`, { headers })
        }
        return null;
    }
}
