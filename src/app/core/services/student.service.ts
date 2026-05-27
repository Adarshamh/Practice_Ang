import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${environment.apiUrl}/students`
    );
  }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(
      `${environment.apiUrl}/students`,
      student
    );
  }
}