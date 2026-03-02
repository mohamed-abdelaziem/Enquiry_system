import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { userGuard } from './core/guards/user-guard';

export const routes: Routes = [

    {
        path : "",
        redirectTo : "home",
        pathMatch : "full"
    },

    {
        path : "home",
        loadComponent : ()=>import('./core/pages/home/home.component').then(file=>file.HomeComponent),
        title : "Home"
    },

    {
        path : "submit-enquiry",
        loadComponent : ()=>import('./core/pages/submit-enqury/submit-enqury.component').then(file=>file.SubmitEnquryComponent),
        title : "Submit Enquiry",
        canActivate : [userGuard]
    },

    
    {
        path : "enquiry-list",
        loadComponent : ()=>import('./core/pages/enguiry-list/enguiry-list.component').then(file=>file.EnguiryListComponent),
        title : "Enquiry List",
        canActivate : [authGuard]
    },

    {
        path : "category",
        loadComponent : ()=>import('./core/pages/category/category.component').then(file=>file.CategoryComponent),
        title : "Category",
        canActivate : [authGuard]
    },

     {
        path : "status",
        loadComponent : ()=>import('./core/pages/status/status.component').then(file=>file.StatusComponent),
        title : "Status",
        canActivate : [authGuard]
    },

    {
        path : "login",
        loadComponent : ()=>import('./core/pages/login/login.component').then(file=>file.LoginComponent),
        title : "Login"
    },

    {
        path : "enquiry-details/:id",
        loadComponent : ()=>import('./core/pages/enquiry-details/enquiry-details.component').then(file=>file.EnquiryDetailsComponent),
        title : "Enquiry Details"
    },

];
