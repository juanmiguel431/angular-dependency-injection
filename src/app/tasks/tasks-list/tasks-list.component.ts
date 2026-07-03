import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../task.service';
import { Task, TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider],
})
export class TasksListComponent implements OnInit {
  selectedFilter = signal<string>('ALL');
  private taskService = inject(TaskService);
  protected taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private _tasks: Task[] = [];

  protected get tasks() {
    if (this.selectedFilter() === 'ALL') {
      return this._tasks;
    }

    return this._tasks.filter((task) => task.status === this.selectedFilter());
  }

  ngOnInit(): void {
    const subscription = this.taskService.tasks$.subscribe((tasks) => {
      this._tasks = tasks;
      this.changeDetectorRef.detectChanges();
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
