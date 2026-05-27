import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Student } from '../../../core/models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})

export class StudentFormComponent {
  @Output()
  saveStudentEvent = new EventEmitter<Student>();
  studentForm!: FormGroup;
  semesters: string[] = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th'
  ];

  genders: string[] = [
    'Male',
    'Female',
    'Third Gender'
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      age: [{ value: '', disabled: true }],
      gender: ['', Validators.required],
      phone: ['', [ Validators.required, Validators.pattern('^[0-9]{10}$') ]],
      semester: ['', Validators.required],
      totalFees: ['', Validators.required],
      feesPaid: ['', Validators.required],
      feesRemaining: [{ value: '', disabled: true }]
    });
  }

  calculateAge(): void {
    const dob = new Date(this.studentForm.get('dob')?.value);
    const timeDiff = Math.abs(Date.now() - dob.getTime());
    const age = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    this.studentForm.patchValue({
      age: age
    });
  }

  calculateRemainingFees(): void {
    const totalFees = Number(this.studentForm.get('totalFees')?.value);
    const feesPaid = Number(this.studentForm.get('feesPaid')?.value);
    const remaining = totalFees - feesPaid;
    this.studentForm.patchValue({
      feesRemaining: remaining
    });
  }

  onSave(): void {
    const student: Student = {
      ...this.studentForm.getRawValue(),
      feesStatus:
        this.studentForm.getRawValue().feesRemaining === 0
          ? 'Paid' : 'Unpaid'
    };
    this.saveStudentEvent.emit(student);
    this.clearForm();
  }

  clearForm(): void {
    this.studentForm.reset();
  }
}