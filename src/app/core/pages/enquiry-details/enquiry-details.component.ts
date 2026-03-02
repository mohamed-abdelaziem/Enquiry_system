import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory, IEnquiry, IStatus } from '../../Types/allTypes.interface';
import { GlobalLoadingComponent } from '../../components/global-loading/global-loading.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry-details',
  imports: [GlobalLoadingComponent, CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './enquiry-details.component.html',
  styleUrl: './enquiry-details.component.css',
})
export class EnquiryDetailsComponent implements OnInit {
  private activtedRoute = inject(ActivatedRoute);
  private masterService = inject(MasterService);
  private toastr = inject(ToastrService);
  deleteLoading = signal<boolean>(false);
  enquiry!: IEnquiry;
  router = inject(Router);
  getEnqLoading = signal<boolean>(false);
  categoryList: ICategory[] = [];
  statusList: IStatus[] = [];
  enquiryId = 0;
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllStatus();
    this.activtedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.enquiryId = Number(id);
        this.getEnqById(Number(id));
      }
    });

    this.updateForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required],
      enquiryType: [''],
      categoryId: [0],
      enquiryId: [this.enquiryId],
      statusId: [0],
      isConverted : [false],
      message: ['', Validators.required],
      feedback: [''],
      followUpDate: ['', Validators.required],
    });
  }

  getEnqById(id: number) {
    this.getEnqLoading.set(true);
    this.masterService.getEnquiry(id).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.enquiry = res.data;
          this.getEnqLoading.set(false);
          console.log(res);
        } else {
          this.getEnqLoading.set(false);
        }
      },
      error: (err) => {
        this.getEnqLoading.set(false);
      },
    });
  }

  deleteEnquiry(id: number) {
    this.deleteLoading.set(true);
    this.masterService.deleteEnquiry(id).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.toastr.success(`The Enquiry Deleted Successfully`);
          this.router.navigateByUrl('/enquiry-list');
          this.deleteLoading.set(false);
        } else {
          this.toastr.error(res.message);
          this.deleteLoading.set(false);
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Delete The Enquiry`);
        this.deleteLoading.set(false);
      },
    });
  }

  isEditMode = false;
  updateLoading = false;

  updateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  editEnquiry(enquiry: any) {
    this.isEditMode = true;

    this.updateForm.patchValue(enquiry);
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  submitUpdate() {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    this.updateLoading = true;
    const data = this.updateForm.value;
    this.masterService.updateEnquiry(data, this.enquiryId).subscribe({
      next: (res) => {
      if(res.result == true){
        this.updateLoading = false;
        this.getEnqById(data.enquiryId);
        this.toastr.success(`The Enquiry Updated Successfully`);
        this.cancelEdit();
      }else{
          this.updateLoading = false;
        this.toastr.error(`Can't Update This Enquiry`);
         this.cancelEdit();
      }
      },
      error: (err) => {
        this.updateLoading = false;
        this.toastr.error(`Can't Update This Enquiry`);
         this.cancelEdit();
      },
    });
  }

  getAllCategories() {
    this.masterService.getAllCategories().subscribe({
      next: (res) => {
       if(res.result == true){
         this.categoryList = res.data;
       }
      },
      error: (err) => {
      },
    });
  }

  getAllStatus() {
    this.masterService.getAllStatus().subscribe({
      next: (res) => {
        if(res.result == true){
          this.statusList = res.data;
        }
      },
      error: (err) => {
      },
    });
  }
}
