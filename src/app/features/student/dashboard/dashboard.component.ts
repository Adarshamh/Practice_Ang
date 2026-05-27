import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentTableComponent } from '../student-table/student-table.component';
import { Student } from '../../../core/models/student';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StudentFormComponent,
    StudentTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  students: Student[] = [];

  constructor(
    private studentService: StudentService
  ) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService
      .getStudents()
      .subscribe({
        next: (response) => {
          this.students = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  onSaveStudent(student: Student): void {
    this.studentService
      .saveStudent(student)
      .subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}