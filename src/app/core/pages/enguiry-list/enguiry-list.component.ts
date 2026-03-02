import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IEnquiry } from '../../Types/allTypes.interface';
import { MasterService } from '../../services/master.service';
import { Router, RouterLink } from '@angular/router';
import { GlobalLoadingComponent } from '../../components/global-loading/global-loading.component';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enguiry-list',
  imports: [CommonModule, GlobalLoadingComponent, DatePipe, SearchPipe, FormsModule, RouterLink],
  templateUrl: './enguiry-list.component.html',
  styleUrl: './enguiry-list.component.css',
})
export class EnguiryListComponent implements OnInit {
  enquiryList: IEnquiry[] = [];
  masterService = inject(MasterService);
  toastr = inject(ToastrService);
  router = inject(Router);
  updateEnquiryLoadig = signal<boolean>(false);
  getEnquiryLoadig = signal<boolean>(false);
  deleteLoading = signal<boolean>(false);
  searchTerm: string = '';

  ngOnInit(): void {
    this.getAllEnquires();
  }

  deleteEnquiry(id: number) {
    this.masterService.deleteEnquiry(id).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.toastr.success(`The Enquiry Deleted Successfully`);
          this.getAllEnquires();
        } else {
          this.toastr.error(res.message);
          this.getAllEnquires();
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Delete The Enquiry`);
        this.getAllEnquires();
      },
    });
  }

  getAllEnquires() {
    this.getEnquiryLoadig.set(true);
    this.masterService.getAllEnqiry().subscribe({
      next: (res) => {
        if (res.result == true) {
          this.enquiryList = res.data;
          console.log(res);
          this.getEnquiryLoadig.set(false);
        } else {
          this.getEnquiryLoadig.set(false);
        }
      },
      error: (err) => {
        this.getEnquiryLoadig.set(false);
      },
    });
  };
}
