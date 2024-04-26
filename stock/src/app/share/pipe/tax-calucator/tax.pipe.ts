import { Pipe, PipeTransform } from '@angular/core';
import { tax } from '../utils';

@Pipe({
  name: 'tax'
})
export class TaxPipe implements PipeTransform {

  transform = tax;

  


}
