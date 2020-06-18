import { Component } from '@angular/core';
import { FILTERS } from 'src/app/constants/filter';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from 'src/app/store/todo-state.interface';
import { onFilterSelect } from 'src/app/store/actions/filter.action';

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
  
  constructor(private store: Store<TodoStateInterface>) {
    this.filter$ = store.select('filter');
  }

  handleFilterSelect(filter: string) {
    this.store.dispatch(onFilterSelect(filter));
  }

}
