import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCompletedCount, selectItemsLeft, selectAllCount } from '../../store/selectors/todo.selector';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { FILTERS } from 'src/app/constants/filter';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  categoryCounter = [];

  filter$: Observable<string>;

  constructor(private store: Store<TodoStateInterface>, public filterService: FilterService) {

    this.filter$ = this.store.select('filter');

    this.categoryCounter = [
      { key: FILTERS.all, value: this.store.select(selectAllCount) },
      { key: FILTERS.active, value: this.store.select(selectItemsLeft) },
      { key: FILTERS.completed, value: this.store.select(selectCompletedCount) }
    ];
  }
}
