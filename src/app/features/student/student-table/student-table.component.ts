import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../../core/models/student';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  @Input()
  students: Student[] = [];
  @Output() editStudent = new EventEmitter<Student>();
  @Output() deleteStudent = new EventEmitter<Student>();
  currentPage = 1;
  pageSize = 5;
  get paginatedStudents(): Student[] {
    const start =
      (this.currentPage - 1) * this.pageSize;
    return this.students.slice(
      start,
      start + this.pageSize
    );
  }

  nextPage(): void {
    if (
      this.currentPage * this.pageSize <
      this.students.length
    ) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onEdit(student: Student): void {
    this.editStudent.emit(student);
  }

  onDelete(student: Student): void {
    this.deleteStudent.emit(student);
  }
}