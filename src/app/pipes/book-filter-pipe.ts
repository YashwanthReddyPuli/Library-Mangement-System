import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../library.model';

@Pipe({
  name: 'bookFilter',
  standalone: true
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchTerm: string): Book[] {
    if (!books || !searchTerm) {
      return books;
    }
    
    const lowerTerm = searchTerm.toLowerCase();
    return books.filter(b => 
      b.title.toLowerCase().includes(lowerTerm) || 
      b.author.toLowerCase().includes(lowerTerm) ||
      b.genre.toLowerCase().includes(lowerTerm) ||
      (b.isAvailable ? 'available' : 'borrowed').includes(lowerTerm)
    );

  }
}
