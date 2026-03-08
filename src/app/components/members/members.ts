import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MemberService } from '../../services/member';
import { Member } from '../../library.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DatePipe,
    MatTableModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './members.html',
  styleUrl: './members.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  dataSource = new MatTableDataSource<Member>();
  searchTerm: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'joinDate', 'status'];

  constructor(
    private memberService: MemberService,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(data => {
      this.members = data;
      this.dataSource.data = data;
      this.cdr.markForCheck();
    });
  }

  onSearchChange(searchValue: string) {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert("Please ensure all fields are correctly filled.");
      return;
    }

    const { name, email } = form.value;

    this.memberService.addMember({
      id: this.members.length + 1,
      name,
      email,
      joinDate: new Date(),
      isActive: true
    }).subscribe(() => {
      this.notification.success(`Member "${name}" successfully enlisted.`);
      form.resetForm();
      this.loadMembers();
    });
  }
}
