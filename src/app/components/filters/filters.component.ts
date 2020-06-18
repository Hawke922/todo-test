import { Component } from '@angular/core';
import { FILTERS } from 'src/app/constants/filter';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from 'src/app/store/todo-state.interface';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Completed' }
  ];

  filter$: Observable<string>;
  
  constructor(private store: Store<TodoStateInterface>, public filterService: FilterService) {
    this.filter$ = this.store.select('filter');
  }
}
