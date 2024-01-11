import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeleteConfirmationModalComponent } from '../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FILE_UPLOAD_TYPE } from 'src/app/helpers/application.const';
import { ApiResponseInterface } from 'src/app/interfaces/common-interface';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CommodityService } from 'src/app/services/commodity.service';

@Component({
  selector: 'app-commodities',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgFor,
    NavbarComponent,
    SidebarComponent,
    DeleteConfirmationModalComponent,
  ],
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css'],
})
export class CommoditiesComponent {
  public modalId: string = 'delete-category-modal';
  public itemIdToDelete: string = 'jkrej49';
  public itemNameToDelete: string = 'Ruban';

  public categoriesList: any;
  public CategoryForm!: FormGroup;
  public showAdd!: boolean;
  public showUpdate!: boolean;
  public file!: File;
  getCategory: any;

  /**
   * Creates an instance of categories management component.
   * @param categoryService
   * @param FormBuilder
   * @param localStorage
   */
  constructor(
    private commodityService: CommodityService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.getCategories();
    this.createForm();
  }

  /**
   * Gets categories
   */
  getCategories() {
    this.commodityService.getCommodity().subscribe({
      next: (res: ApiResponseInterface) => {
        this.categoriesList = res.data;
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  /**
   * Creates form
   */
  createForm() {
    this.CategoryForm = this.fb.group({
      productName: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  /**
   * Determines whether file selected on
   * @param event
   */
  onFileSelected(event: any): void {
    this.file = event.target.files[0] as File;
  }
  /**
   * Determines whether create category on
   */
  private onCreateCategory(imageUrl: string) {
    let param = {
      name: this.CategoryForm.value.productName,
      image: imageUrl,
    };
    this.commodityService.postCommodity(param).subscribe({
      next: (res: ApiResponseInterface) => {
        this.getCategories();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.CategoryForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  /**
   * Deletes category
   * @param item
   */
  public deleteCategory(item: any) {
    this.commodityService.deletCommodity(item._id).subscribe({
      next: (res: ApiResponseInterface) => {
        console.log(res, 'Product Delete Successfully');
        this.getCategories();
        let ref = document.getElementById('canceldelete');
        ref?.click();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  /**
   * Updates product details
   */
  updateCategoryDetails() {
    const formData = new FormData();
    formData.append('name', this.CategoryForm.value.productName);
    formData.append('image', this.file);
    this.commodityService
      .updateCommodity(this.getCategory._id, formData)
      .subscribe({
        next: (res: ApiResponseInterface) => {
          console.log(res);
          this.getCategories();
          let ref = document.getElementById('cancel');
          ref?.click();
          this.CategoryForm.reset();
        },
      });
  }

  /**
   * Evolves button dynamics
   */
  evolveButtonDynamics() {
    this.CategoryForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  /**
   * Gets catogry by id
   * @param id
   */
  getCatogryById(id: string) {
    this.showAdd = false;
    this.showUpdate = true;
    console.log(id);
    this.commodityService.getCommodityById(id).subscribe({
      next: (res: ApiResponseInterface) => {
        this.getCategory = res.data;
        this.CategoryForm.patchValue({ productName: res.data.name });
        console.log('res', res);
      },
      error: console.log,
    });
  }

  /**
   * Files upload
   */
  public fileUpload() {
    const formData = new FormData();
    formData.append('service', FILE_UPLOAD_TYPE[0]);
    formData.append('media', this.file);
    this.commodityService.fileUplode(formData).subscribe({
      next: (res: ApiResponseInterface) => {
        this.onCreateCategory(res.data[0].url);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
