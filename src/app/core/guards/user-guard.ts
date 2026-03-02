import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MasterService } from '../services/master.service';

export const userGuard: CanActivateFn = (route, state) => {
  const masterService = inject(MasterService);
  const router = inject(Router);
  const loggedData = localStorage.getItem('enquiryData');


  if(masterService.isLogged() == false || loggedData == null){
    return true;
  }else{
    return router.createUrlTree(['/home']);
  }

};
