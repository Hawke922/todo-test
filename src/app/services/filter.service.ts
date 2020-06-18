import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from '../store/todo-state.interface';
import { onFilterSelect } from '../store/actions/filter.action';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private store: Store<TodoStateInterface>) { }

  handleFilterSelect(filter: string) {
    this.store.dispatch(onFilterSelect(filter));
  }
}
