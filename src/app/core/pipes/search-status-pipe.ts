import { Pipe, PipeTransform } from '@angular/core';
import { IStatus } from '../Types/allTypes.interface';

@Pipe({
  name: 'searchStatus',
})
export class SearchStatusPipe implements PipeTransform {

  transform(value: IStatus[],searchTerm : string ): IStatus[] {
    const filterdData = value.filter((category)=>{
      return category.statusName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filterdData;
  }

}
