import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../library.model';

@Pipe({
  name: 'genreFilter',
  standalone: true
})
export class GenreFilterPipe implements PipeTransform {
  transform(books: Book[], genre: string): Book[] {
    if (!books || !genre) return books;
    const lowerTerm = genre.toLowerCase();
    return books.filter(b => b.genre.toLowerCase().includes(lowerTerm));
  }
}
