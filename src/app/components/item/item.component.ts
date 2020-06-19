import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TodoInterface } from '../../services/todo.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnChanges {
  editing = false;

  name = '';

  @Input()
  public todo: TodoInterface;

  @Output()
  remove = new EventEmitter<string>();

  @Output()
  update = new EventEmitter<TodoInterface>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.todo) {
      this.name = changes.todo.currentValue.name;
    }
  }

  handleRemove() {
    this.remove.emit(this.todo.id);
  }

  handleBlur() {
    this.update.emit({ id: this.todo.id, name: this.name, timeStamp: Number(this.todo.timeStamp) });
    this.editing = false;
  }

  handleEdit() {
    this.editing = true;
  }

  handleCompleted() {
    this.update.emit({ 
      id: this.todo.id,
      completed: !this.todo.completed,
      finishTime: this.timeTracker(this.todo.timeStamp)
    });
  }

  timeTracker(timeStamp) {
    const timePassed = Date.now() - timeStamp;
    const minutes = Math.floor(timePassed / 60000);
    const seconds = ((timePassed % 60000) / 1000).toFixed(0);
    return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
  }
}
