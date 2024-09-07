import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router=inject(Router)
  const _PLATFORM_ID=inject(PLATFORM_ID)



  if(typeof localStorage !=='undefined'){
    if(localStorage.getItem('userToken')!==null){
      return true;
    }
    else{
      _Router.navigate(['/login'])
      return false;
    }
  }
  else{
    return false
  }

};
