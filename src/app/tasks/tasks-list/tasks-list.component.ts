import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('ALL');
  private taskService = inject(TaskService);
  protected taskStatusOptions = inject(TASK_STATUS_OPTIONS);

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
