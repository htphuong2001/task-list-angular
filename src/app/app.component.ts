import { Component, OnInit } from '@angular/core';
import { Filter } from './models/filter-enum.model';

import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  filterTasks: Task[] = [];
  newTask: string = '';
  search: string = '';
  filter: Filter = Filter.All;

  ngOnInit(): void {
    console.log('init');
    this.tasks = JSON.parse(localStorage.getItem('task-list') || '[]');
    this.updateFilter();
  }

  saveTask(): void {
    let task: Task = new Task();
    task.content = this.newTask;
    this.tasks.push(task);
    this.newTask = '';
    localStorage.setItem('task-list', JSON.stringify(this.tasks));
  }

  updateFilter() {
    let tasksSearch =
      this.search.length != 0
        ? this.tasks.filter((task) =>
            task.content
              .toLocaleLowerCase()
              .includes(this.search.toLocaleLowerCase())
          )
        : this.tasks;
    switch (this.filter) {
      case Filter.All:
        this.filterTasks = tasksSearch;
        break;
      case Filter.Active:
        this.filterTasks = tasksSearch.filter((task) => !task.isCompleted);
        break;
      case Filter.Completed:
        this.filterTasks = tasksSearch.filter((task) => task.isCompleted);
        break;
      default:
        break;
    }
  }

  removeTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.updateFilter();
    localStorage.setItem('task-list', JSON.stringify(this.tasks));
  }

  filterAll() {
    this.filter = Filter.All;
    this.updateFilter();
  }

  filterActive() {
    this.filter = Filter.Active;
    this.updateFilter();
  }

  filterCompleted() {
    this.filter = Filter.Completed;
    this.updateFilter();
  }

  changeStatusTask() {
    this.updateFilter();
  }

  changeSearch() {
    this.updateFilter();
  }
}
