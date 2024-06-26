import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Sala } from '../models/sala.model';
import { Observable } from 'rxjs';

const baseUrlSala = AppSettings.API_ENDPOINT+ '/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http:HttpClient) { }

  registrar(data:Sala):Observable<any>{
    return this.http.post(baseUrlSala, data);
  }
}
