import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from '../../store/todo-state.interface';
import { onCreateWithTimestamp } from '../../store/actions/todo.action';

const ENTER_KEY = 'Enter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  name = '';

  constructor(private store: Store<TodoStateInterface>) {}

  handleChange(event: KeyboardEvent) {
    this.name = (event.target as HTMLInputElement).value;
  }

  // old submit function

  // handleSubmit(event: KeyboardEvent) {
  //   if (event.key !== ENTER_KEY) {
  //     return;
  //   }

  //   this.store.dispatch(onCreate(this.name));
  //   this.name = '';
  // }



  // added time tracker to submit function as per task n. 5

  handleSubmitWithTimestamp(event: KeyboardEvent) {
    if (event.key !== ENTER_KEY) {
      return;
    }
    this.store.dispatch(onCreateWithTimestamp({ name: this.name, timeStamp: Date.now()}));
    this.name = '';
  }
}
