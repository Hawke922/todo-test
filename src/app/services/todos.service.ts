import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoListInterface } from './todoList.interface';

const LOCAL_STORAGE_KEY = 'todoapp_todoLists';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  initialTodoLists = [{
    id: 'initial-todo-list',
    name: 'My Todo List'
  }]

  todoListsSource = new BehaviorSubject<TodoListInterface[]>(this.loadTodoLists());
  currentTodoListsArray = this.todoListsSource.asObservable();

  activeTodoListSource = new BehaviorSubject<string>(this.initialTodoLists[0].id);
  activeTodoList = this.activeTodoListSource.asObservable();

  constructor() { }

  loadTodoLists(): TodoListInterface[] {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || this.initialTodoLists;
  }

  addTodoList(todoLists:TodoListInterface[]) {
    this.todoListsSource.next(todoLists);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoLists));
  }

  activateTodoList(listId: string) {
    this.activeTodoListSource.next(listId);
  }
}
