import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private studentsSource = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSource.asObservable();
  setStudents(students: Student[]): void {
    this.studentsSource.next(students);
  }

  getStudents(): Student[] {
    return this.studentsSource.value;
  }
}