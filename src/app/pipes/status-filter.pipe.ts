import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../library.model';

@Pipe({
  name: 'statusFilter',
  standalone: true
})
export class StatusFilterPipe implements PipeTransform {
  transform(books: Book[], status: string): Book[] {
    if (!books || !status || status === 'all') return books;
    
    const isLookingForAvailable = status.toLowerCase() === 'available';
    return books.filter(b => b.isAvailable === isLookingForAvailable);
  }
}
