import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('ALL');
  private taskService = inject(TaskService);

  protected tasks = computed(() => {
    if (this.selectedFilter() === 'ALL') {
      return this.taskService.tasks();
    }

    return this.taskService.tasks().filter((task) => task.status === this.selectedFilter());
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
