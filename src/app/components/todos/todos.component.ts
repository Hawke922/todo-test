import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TodosService } from 'src/app/services/todos.service';
import { TodoListInterface } from 'src/app/services/todoList.interface';
import { TodoLocalService } from 'src/app/services/todo-local.service';
import { Store } from '@ngrx/store';
import { TodoStateInterface } from 'src/app/store/todo-state.interface';
import { onLoad } from 'src/app/store/actions/todo.action';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit {

  newTodoListName = '';

  todosArray = []

  constructor(
    private todosService: TodosService,
    private todoLocalService: TodoLocalService,
    private store: Store<TodoStateInterface>) { }

  ngOnInit(): void {
    this.todosService.currentTodoListsArray.subscribe(todoListArray => this.todosArray = todoListArray)
  }

  addTodoList() {
    const newTodoList:TodoListInterface = {
      id: uuidv4(),
      name: this.newTodoListName
    }
    this.todosArray.push(newTodoList);
    this.todosService.addTodoList(this.todosArray);
    this.newTodoListName = '';
  }

  activateList(id:string) {
    this.todosService.activateTodoList(id);
    this.store.dispatch(onLoad(TodoLocalService.loadTodos()));
  }
}
