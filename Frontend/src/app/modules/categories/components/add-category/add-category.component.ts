import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../models/category.model';
import { ToasterService } from '../../../../services/toaster.service';
import { CategoryService } from '../../services/category.service';
import { ErrorCode } from '../../../../enums/errorCode.enum';
import { ApiResponse } from '../../../../models/api-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
  standalone: false
})
export class AddCategoryComponent {
  categoryForm: FormGroup;
  category: Category | null = null;

  private destroy$ = new Subject<void>();
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private _toasterService: ToasterService) {

    this.category = data;

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (this.category) {
      this.categoryForm.patchValue(this.category);
    }
  }

  onSubmit() {
    console.log(this.categoryForm);
    if (this.categoryForm.valid) {
      if (this.category) {
        this._categoryService.updateCategory(this.category.id, this.categoryForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: ApiResponse<Category>) => {
              if (res.errorCode === ErrorCode.Success) {
                this._toasterService.success('Category Updated Successfully');
                this.dialogRef.close(this.categoryForm.value);
              } else {
                this._toasterService.success('Something Went Wrong', res.message);
              }
            },
            error: (error) => this._toasterService.success('Something Went Wrong', error.message)
          });
      } else {
        this._categoryService.createCategory(this.categoryForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: ApiResponse<Category>) => {
              if (res.errorCode === ErrorCode.Success) {
                this._toasterService.success('Category Added Successfully');
                this.dialogRef.close(this.categoryForm.value);
              } else {
                this._toasterService.success('Something Went Wrong', res.message);
              }
            },
            error: (error) => this._toasterService.success('Something Went Wrong', error.message)
          });
      }

    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
