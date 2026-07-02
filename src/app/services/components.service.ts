import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  apiUrl = 'https://osstem.naquinesm.com/api/component';

  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get(this.apiUrl);
  }
  get(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  create(data:any){
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: FormData) {
    data.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${id}`, data);
  }
  delete(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
