import { Component,OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { DeleteConfirmationModalComponent } from '../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponseInterface } from 'src/app/interfaces/common-interface';
import { FILE_UPLOAD_TYPE } from 'src/app/helpers/application.const';

@Component({
  selector: 'app-categories-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, NgIf,NgFor, NavbarComponent, SidebarComponent, DeleteConfirmationModalComponent],
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.css']
})
export class CategoriesManagementComponent implements OnInit{
  public modalId: string = 'delete-category-modal';
  public itemIdToDelete: string = 'jkrej49';
  public itemNameToDelete: string = 'Ruban';

  public categoriesList: any;
  public CategoryForm!: FormGroup;
  public showAdd!: boolean;
  public showUpdate!: boolean;
  public file!:File
  getCategory: any;
 
  /**
   * Creates an instance of categories management component.
   * @param categoryService 
   * @param FormBuilder
   * @param localStorage 
   */
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private localStorage: LocalStorageService,

  ) {
    
  }
 
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
    this.categoryService.getCategory().subscribe({
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
    image: imageUrl
   }
    this.categoryService.postCategory(param).subscribe({
      next: (res: ApiResponseInterface) => {
        this.getCategories()
        let ref=document.getElementById('cancel')
        ref?.click()
        this.CategoryForm.reset()
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);}
    });
  }

  /**
   * Deletes category
   * @param item 
   */
 public deleteCategory(item:any) {
    this.categoryService.deletCategory(item._id).subscribe({
      next: (res: ApiResponseInterface) => {
        console.log(res, 'Product Delete Successfully');
        this.getCategories()
        let ref=document.getElementById('canceldelete')
       ref?.click()
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
    this.categoryService.updateCategory(this.getCategory._id, formData).subscribe({
      next: (res: ApiResponseInterface) => {
       console.log(res);
       this.getCategories()
       let ref=document.getElementById('cancel')
       ref?.click()
       this.CategoryForm.reset()
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
  getCatogryById(id:string){
    this.showAdd = false;
    this.showUpdate = true;
    console.log(id);
    this.categoryService.getCatogryById(id).subscribe({
      next:(res:ApiResponseInterface)=>{
        this.getCategory = res.data;
        this.CategoryForm.patchValue({productName: res.data.name})
      console.log('res',res);
      },
      error:console.log
    })
  }

 
  /**
   * Files upload
   */
  public fileUpload() {
    const formData = new FormData();
    formData.append('service',FILE_UPLOAD_TYPE[0]);
    formData.append('media', this.file);  
    this.categoryService.fileUplode(formData).subscribe({
      next: (res: ApiResponseInterface) => {
        this.onCreateCategory(res.data[0].url);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

}
