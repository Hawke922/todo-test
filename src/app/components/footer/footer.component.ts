import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCompletedCount, selectItemsLeft } from '../../store/selectors/todo.selector';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onClearCompleted } from '../../store/actions/todo.action';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  itemsLeft$: Observable<number>;

  completedCount$: Observable<number>;

  itemText$: Observable<string>;

  constructor(private store: Store<TodoStateInterface>) {
    this.itemsLeft$ = store.select(selectItemsLeft);
    this.completedCount$ = store.select(selectCompletedCount);
    this.itemText$ = store.select((state: TodoStateInterface) => (selectItemsLeft(state) === 1 ? 'item' : 'items'));
  }

  handleClearCompleted() {
    this.store.dispatch(onClearCompleted());
  }
}
