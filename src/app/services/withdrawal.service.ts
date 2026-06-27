import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  request(data:any) {
    return this.http.post(
      `${this.apiUrl}/withdrawals`,
      data,
      this.getHeaders()
    );
  }

  myRequests() {
    return this.http.get(
      `${this.apiUrl}/my-withdrawals`,
      this.getHeaders()
    );
  }

  getAll() {
    return this.http.get(
      `${this.apiUrl}/withdrawals`,
      this.getHeaders()
    );
  }

  pending() {
    return this.http.get(
      `${this.apiUrl}/withdrawals/pending`,
      this.getHeaders()
    );
  }

  approve(id:number) {
    return this.http.put(
      `${this.apiUrl}/withdrawals/${id}/approve`,
      {},
      this.getHeaders()
    );
  }

  decline(id:number, remarks:string) {
    return this.http.put(
      `${this.apiUrl}/withdrawals/${id}/decline`,
      { remarks },
      this.getHeaders()
    );
  }
  getUserWithdrawals(){
    return this.http.get(
      `${this.apiUrl}/withdrawals`,
      this.getHeaders()
    )
  }
}
