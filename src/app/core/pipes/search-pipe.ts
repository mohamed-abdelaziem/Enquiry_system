import { Pipe, PipeTransform } from '@angular/core';
import { IEnquiry } from '../Types/allTypes.interface';

@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {

  transform(value: IEnquiry[] | null, searchTerm: string): IEnquiry[] {

    if (!value) return [];

    if (!searchTerm || searchTerm.trim() === '') {
      return value;
    }

    const lowerSearch = searchTerm.toLowerCase();

    return value.filter((enq) =>
      (enq.customerEmail?.toLowerCase().includes(lowerSearch)) ||
      (enq.customerName?.toLowerCase().includes(lowerSearch)) ||
      (enq.enquiryType?.toLowerCase().includes(lowerSearch)) ||
      (enq.message?.toLowerCase().includes(lowerSearch)) ||
      (enq.feedback?.toLowerCase().includes(lowerSearch))
    );
  }

}