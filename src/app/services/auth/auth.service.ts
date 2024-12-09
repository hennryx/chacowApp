import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ENDPOINT } from "../index"
import { UserData } from '../../models/userData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private userData = new BehaviorSubject<any>(null);
    private userIdSubject = new BehaviorSubject<number | null>(null);

    constructor(private http: HttpClient) {}
    
    login(email: string, password: string) {

        if (email === "admin@gmail.com" && password === "password") {
            return {
                email: "admin@gmail.com",
                password: "password",
                firstname: "Charisse",
                middlename: "",
                lastname: "Busalpa",
                role: "admin",
            };
        } else {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find((user: { email: string; password: string }) => user.email === email);

            if (user) {
                return user;  
            } else {
                return null;
            }
        }
    }

    register(data: any) {
        return this.http.post(`${ENDPOINT}/auth/create`, { ...data });
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        this.userData.next(null);
    }

    setUserData(data: any) {
        this.userData.next(data); 
        localStorage.setItem('userRole', data.role);
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

    getUserRole(): string | null {
        return localStorage.getItem('userRole');
    }

    fetchUserData() {
        const token = this.getToken();
        const id = this.getUserId();
        
        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            return this.http.get<UserData>(`${ENDPOINT}/auth/${id}`, { headers })
        }
        return null;
    }
}
