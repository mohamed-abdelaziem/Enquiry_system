import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../../services/master.service';
import { ICategory } from '../../Types/allTypes.interface';
import { GlobalLoadingComponent } from '../../components/global-loading/global-loading.component';

@Component({
  selector: 'app-submit-enqury',
  imports: [ReactiveFormsModule, GlobalLoadingComponent],
  templateUrl: './submit-enqury.component.html',
  styleUrl: './submit-enqury.component.css',
})
export class SubmitEnquryComponent implements OnInit {
  private toastr = inject(ToastrService);
  private masterService = inject(MasterService);
  createLoading = signal<boolean>(false);
  categoryList: ICategory[] = [];
  categoryLoading = signal<boolean>(false);
  createEnquiryLoading = signal<boolean>(false);


  ngOnInit(): void {
    this.getAllCategories();
  }

  enquiryForm: FormGroup = new FormGroup({
    enquiryId: new FormControl(0),
    customerName: new FormControl('', [Validators.required]),
    customerEmail: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    categoryId: new FormControl(0, [Validators.required]),
    statusId: new FormControl(83, [Validators.required]),
    enquiryType: new FormControl('', [Validators.required]),
    isConverted: new FormControl(false, [Validators.required]),
    enquiryDate: new FormControl('', [Validators.required]),
    followUpDate: new FormControl(new Date(), [Validators.required]),
    feedback: new FormControl('', [Validators.required]),
  });

  getAllCategories() {
    this.categoryLoading.set(true);
    this.masterService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        this.categoryLoading.set(false);
      },
      error: (err) => {
        this.toastr.error(`Something Error`);
        this.categoryLoading.set(false);
      },
    });
  }

  createEnquiry() {
    if (this.enquiryForm.errors) {
      this.enquiryForm.markAllAsTouched();
      this.toastr.error('Please Fill This Fields');
      return;
    }
    this.createEnquiryLoading.set(true);
    const data = {
      ...this.enquiryForm.value,
      categoryId: Number(this.enquiryForm.value.categoryId),
      enquiryDate: new Date(this.enquiryForm.value.enquiryDate).toISOString(),
      followUpDate: new Date(this.enquiryForm.value.followUpDate).toISOString(),
    };

    this.masterService.createEnquiry(data).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.createEnquiryLoading.set(false);
          this.toastr.success(`The Enquiry Created Successfully`);
          this.enquiryForm.reset();
        } else {
          this.createEnquiryLoading.set(false);
          this.toastr.success(`Can't Created The Enquiry`);
          this.enquiryForm.reset();
        }
      },
      error: (err) => {
        this.createEnquiryLoading.set(false);
        this.toastr.success(`Can't Created The Enquiry`);
        this.enquiryForm.reset();
      },
    });
  }
}
