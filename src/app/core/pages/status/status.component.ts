import { Component, inject, OnInit, signal } from '@angular/core';
import { IStatus } from '../../Types/allTypes.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { GlobalLoadingComponent } from '../../components/global-loading/global-loading.component';
import { ToastrService } from 'ngx-toastr';
import { SearchStatusPipe } from '../../pipes/search-status-pipe';


@Component({
  selector: 'app-Status',
  imports: [ReactiveFormsModule, CommonModule, GlobalLoadingComponent , FormsModule , SearchStatusPipe ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css',
})
export class StatusComponent implements OnInit {
  statusList: IStatus[] = [];
  masterService = inject(MasterService);
  isModalOpen = signal(false);
  isEditMode = false;
  editStatusId: number | null = null;
  getStatusLoading = signal(false);
  toastr = inject(ToastrService);
  updateStatusLoading = signal<boolean>(false);
  createStatusLoading = signal<boolean>(false);
  searchTerm : string = '';

  statusForm: FormGroup = new FormGroup({
    statusId: new FormControl(0),
    statusName: new FormControl(''),
    isActive: new FormControl<boolean>(false),
  });

  ngOnInit(): void {
    this.getAllStatus();
  }

  openCreateModal() {
    this.isEditMode = false;
    this.statusForm.reset({ isActive: false });
    this.isModalOpen.set(true);
  }

  openEditModal(cat: IStatus) {
    this.statusForm.patchValue(cat);
    this.isModalOpen.set(true);
    this.isEditMode = true;
  }

  getAllStatus() {
    this.getStatusLoading.set(true);
    this.masterService.getAllStatus().subscribe({
      next: (res) => {
        if (res.result == true) {
          this.statusList = res.data;
          this.getStatusLoading.set(false);
        } else {
          this.getStatusLoading.set(false);
        }
      },
      error: (err) => {
        this.getStatusLoading.set(false);
      },
    });
  }

  toggleActive(cat: IStatus) {
    cat.isActive = !cat.isActive;
  }

  deleteStatus(statusId: number) {
    this.masterService.deleteStatus(statusId).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.toastr.success(`The Status Deleted Successfully`);
          this.getAllStatus();
        } else {
          this.toastr.error(`Can't Delete The Status`);
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Delete The Status`);
      },
    });
  }

  updateStatus(StatusId: number) {
    const data = this.statusForm.value;
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }

    this.updateStatusLoading.set(true);
    this.masterService.updateStatus(data, data.statusId).subscribe({
      next: (res) => {
        if (res.result) {
          this.updateStatusLoading.set(false);
          this.toastr.success(`The Status Updated Successfully`);
          this.getAllStatus();
          this.isModalOpen.set(false);
          this.statusForm.reset();
        } else {
          this.updateStatusLoading.set(false);
          this.toastr.success(`The Status Updated Successfully`);
          this.getAllStatus();
          this.isModalOpen.set(false);
          this.statusForm.reset();
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Created The Status`);
        this.updateStatusLoading.set(false);
        this.getAllStatus();
        this.isModalOpen.set(false);
        this.statusForm.reset();
      },
    });
  }

  createStatus() {
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }
    const data = {
      ...this.statusForm.value,
      statusId: 0,
    };
    this.createStatusLoading.set(true);
    this.masterService.createStatus(data).subscribe({
      next: (res) => {
        if (res.result) {
          this.createStatusLoading.set(false);
          this.toastr.success(`The Status Created Successfully`);
          this.getAllStatus();
          this.isModalOpen.set(false);
          this.statusForm.reset();
        } else {
          this.createStatusLoading.set(false);
          this.toastr.success(`The Status Created Successfully`);
          this.getAllStatus();
          this.isModalOpen.set(false);
          this.statusForm.reset();
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Created The Status`);
        this.createStatusLoading.set(false);
        this.getAllStatus();
        this.isModalOpen.set(false);
        this.statusForm.reset();
      },
    });
  }

  saveStatus() {
    if (this.isEditMode == true) {
      this.updateStatus(this.statusForm.get('StatusId')?.value);
    } else {
      this.createStatus();
    }
  }
}
