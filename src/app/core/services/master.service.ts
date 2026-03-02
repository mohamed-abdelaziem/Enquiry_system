import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { baseUrl } from '../constant/constant';
import { Observable } from 'rxjs';
import { ICategory, IEnquiry, IMainResponse, IStatus } from '../Types/allTypes.interface';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
   http = inject(HttpClient);
  isLogged = signal<boolean>(false);


  constructor(){
    const data = localStorage.getItem('enquiryData');
    if(data !=null){
      this.isLogged.set(true);
    }else{
      this.isLogged.set(false);
    }
  }


  
  getAllEnqiry():Observable<IMainResponse<IEnquiry[]>>{
    return this.http.get<IMainResponse<IEnquiry[]>>(baseUrl+'get-enquiries');
  };

   getEnquiry(enqId:number):Observable<IMainResponse<IEnquiry>>{
    return this.http.get<IMainResponse<IEnquiry>>(baseUrl+'get-enquiry/'+enqId);
  };

  createEnquiry(data:any):Observable<IMainResponse<IEnquiry>>{
    return this.http.post<IMainResponse<IEnquiry>>(baseUrl+'create-enquiry',data);
  };

  updateEnquiry(data:any,enqId:number):Observable<IMainResponse<IEnquiry>>{
    return this.http.put<IMainResponse<IEnquiry>>(baseUrl+'update-enquiry/'+enqId,data);
  };

  deleteEnquiry(enqId:number):Observable<IMainResponse<any>>{
    return this.http.delete<IMainResponse<any>>(baseUrl+'delete-enquiry/'+enqId);
  };

  

  getAllCategories():Observable<IMainResponse<ICategory[]>>{
    return this.http.get<IMainResponse<ICategory[]>>(baseUrl+'get-categories')
  };


  createCategory(data:any):Observable<IMainResponse<ICategory>>{
    return this.http.post<IMainResponse<ICategory>>(baseUrl+"create-category",data)
  };

  updateCategory(data:any,categoryId:number):Observable<IMainResponse<ICategory>>{
    return this.http.put<IMainResponse<ICategory>>(baseUrl+"update-category/"+categoryId,data)
  };


  deleteCategory(categoryId:number):Observable<IMainResponse<any>>{
    return this.http.delete<IMainResponse<any>>(baseUrl+'delete-category/'+categoryId);
  };


  getAllStatus():Observable<IMainResponse<IStatus[]>>{
    return this.http.get<IMainResponse<IStatus[]>>(baseUrl+'get-statuses')
  };

  createStatus(data:any):Observable<IMainResponse<IStatus>>{
    return this.http.post<IMainResponse<IStatus>>(baseUrl+"create-status",data)
  };

  deleteStatus(statusId:number):Observable<IMainResponse<any>>{
    return this.http.delete<IMainResponse<any>>(baseUrl+'delete-status/'+statusId);
  };

   updateStatus(data:any,statusId:number):Observable<IMainResponse<any>>{
    return this.http.put<IMainResponse<any>>(baseUrl+'update-status/'+statusId,data);
  };




}
