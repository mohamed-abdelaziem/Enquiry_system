import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../Types/allTypes.interface';

@Pipe({
  name: 'searchCategory',
})
export class SearchCategoryPipe implements PipeTransform {

  transform(value: ICategory[],searchTerm:string): ICategory[] {
    const filterdData = value.filter((category)=>{
      return category.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return filterdData;
  }

}
