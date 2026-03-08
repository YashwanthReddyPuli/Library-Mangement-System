import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../library.model';

@Pipe({
  name: 'authorFilter',
  standalone: true
})
export class AuthorFilterPipe implements PipeTransform {
  transform(books: Book[], authorName: string): Book[] {
    if (!books || !authorName) return books;
    const lowerTerm = authorName.toLowerCase();
    return books.filter(b => b.author.toLowerCase().includes(lowerTerm));
  }
}
