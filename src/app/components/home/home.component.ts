import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { observable } from 'rxjs';
import { callbackify } from 'util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data = {
    day: ['Pick up groceries', 'Go home', 'Fall asleep'],
    weak: ['Do the shopping', 'Clean the home'],
    month: ['Clean the car'],
    inProgress: [
      'Check e-mail'    ],
    done: ['Get up', 'Brush teeth', 'Take a shower', 'Get to work'],
  };
  constructor() {}

  ngOnInit(): void {
    this.setItems();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      Object.keys(this.data).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      });
    }
  }
  addTodo(todo) {
    this.data.day.push(todo.value);
    todo.value = '';
    localStorage.setItem('day', JSON.stringify(this.data.day));
  }

  setItems() {
    Object.keys(this.data).forEach((key) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      } else {
        this.data[key] = JSON.parse(localStorage.getItem(key));
      }
    });
  }
}
