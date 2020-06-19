import { TodoInterface } from './todo.interface';
import { TodosService } from './todos.service';
import { Injectable } from '@angular/core';

let activeTodoList:string;

@Injectable({
  providedIn: 'root'
})
export class TodoLocalService {

  constructor(private todosService:TodosService) {
    this.todosService.activeTodoList.subscribe( todoListFromService => activeTodoList = todoListFromService);
  }

  static loadTodos(): TodoInterface[] {
    return JSON.parse(window.localStorage.getItem(activeTodoList) || '[]');
  }

  static storeTodos(todos: TodoInterface[]) {
    window.localStorage.setItem(activeTodoList, JSON.stringify(todos));
  }

}
