import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory } from '../../Types/allTypes.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { GlobalLoadingComponent } from '../../components/global-loading/global-loading.component';
import { ToastrService } from 'ngx-toastr';
import { SearchCategoryPipe } from '../../pipes/search-category-pipe';

@Component({
  selector: 'app-category',
  imports: [ReactiveFormsModule, CommonModule, GlobalLoadingComponent , FormsModule , SearchCategoryPipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  masterService = inject(MasterService);
  isModalOpen = signal(false);
  isEditMode = false;
  editCategoryId: number | null = null;
  getCategoryLoading = signal(false);
  toastr = inject(ToastrService);
  updateCategoryLoading = signal<boolean>(false);
  createCategoryLoading = signal<boolean>(false);
  searchTerm : string = '';

  categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(0),
    categoryName: new FormControl(''),
    isActive: new FormControl<boolean>(false),
  });

  ngOnInit(): void {
    this.getAllCategories();
  }

  openCreateModal() {
    this.isEditMode = false;
    this.categoryForm.reset({ isActive: false });
    this.isModalOpen.set(true);
  }

  openEditModal(cat: ICategory) {
    this.categoryForm.patchValue(cat);
    this.isModalOpen.set(true);
    this.isEditMode = true;
  }

  getAllCategories() {
    this.getCategoryLoading.set(true);
    this.masterService.getAllCategories().subscribe({
      next: (res) => {
        if (res.result == true) {
          this.categories = res.data;
          this.getCategoryLoading.set(false);
        } else {
          this.getCategoryLoading.set(false);
        }
      },
      error: (err) => {
        this.getCategoryLoading.set(false);
      },
    });
  }

  toggleActive(cat: ICategory) {
    cat.isActive = !cat.isActive;
  }

  deleteCategory(catId: number) {
    this.masterService.deleteCategory(catId).subscribe({
      next: (res) => {
        if (res.result == true) {
          this.toastr.success(`The Category Deleted Successfully`);
          this.getAllCategories();
        } else {
          this.toastr.error(`Can't Delete The Category`);
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Delete The Category`);
      },
    });
  }

  updateCategory(categoryId: number) {
    const data = this.categoryForm.value;
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.updateCategoryLoading.set(true);
    this.masterService.updateCategory(data, data.categoryId).subscribe({
      next: (res) => {
        if (res.result) {
          this.updateCategoryLoading.set(false);
          this.toastr.success(`The Category Updated Successfully`);
          this.getAllCategories();
          this.isModalOpen.set(false);
          this.categoryForm.reset();
        } else {
          this.updateCategoryLoading.set(false);
          this.toastr.success(`The Category Updated Successfully`);
          this.getAllCategories();
          this.isModalOpen.set(false);
          this.categoryForm.reset();
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Created The Category`);
        this.updateCategoryLoading.set(false);
        this.getAllCategories();
        this.isModalOpen.set(false);
        this.categoryForm.reset();
      },
    });
  }

  createCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    const data = {
      ...this.categoryForm.value,
      categoryId: 0,
    };
    this.createCategoryLoading.set(true);
    this.masterService.createCategory(data).subscribe({
      next: (res) => {
        if (res.result) {
          this.createCategoryLoading.set(false);
          this.toastr.success(`The Category Created Successfully`);
          this.getAllCategories();
          this.isModalOpen.set(false);
          this.categoryForm.reset();
        } else {
          this.createCategoryLoading.set(false);
          this.toastr.success(`The Category Created Successfully`);
          this.getAllCategories();
          this.isModalOpen.set(false);
          this.categoryForm.reset();
        }
      },
      error: (err) => {
        this.toastr.error(`Can't Created The Category`);
        this.createCategoryLoading.set(false);
        this.getAllCategories();
        this.isModalOpen.set(false);
        this.categoryForm.reset();
      },
    });
  }

  saveCategory() {
    if (this.isEditMode == true) {
      this.updateCategory(this.categoryForm.get('categoryId')?.value);
    } else {
      this.createCategory();
    }
  }
}
