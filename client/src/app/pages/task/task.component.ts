import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any[] = [];

  // Create form model
  newTask = {
    title: '',
    description: '',
    status: 'pending'
  };

  // Editing model
  editTaskId: string | null = null;
  editData = {
    title: '',
    description: '',
    status: 'pending'
  };

  // Loading / UI state
  isLoading = false;
  isSaving = false;
  isUpdating = false;
  isDeleting = false;

  constructor(
    private task: TaskService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadTasks(userId);
    } else {
      // If no userId, still try to show empty state (or redirect to login)
      this.tasks = [];
    }
  }

  loadTasks(userId: string) {
    this.isLoading = true;
    this.task.getTasks(userId).subscribe({
      next: (res) => {
        this.tasks = res || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        const msg = err?.error?.message || 'Failed to load tasks';
        this.toastr.error(msg, 'Load Error');
      }
    });
  }

  addTask() {
    if (!this.newTask.title?.trim()) {
      this.toastr.warning('Please enter a title', 'Validation');
      return;
    }

    this.isSaving = true;
    this.task.createTask(this.newTask).subscribe({
      next: (created) => {
        this.isSaving = false;
        this.toastr.success('Task created', 'Success');
        // Reset form
        this.newTask.title = '';
        this.newTask.description = '';
        this.newTask.status = '';

        const userId = localStorage.getItem('userId');
        if (userId) this.loadTasks(userId);
      },
      error: (err) => {
        this.isSaving = false;
        const msg = err?.error?.message || 'Failed to create task';
        this.toastr.error(msg, 'Create Error');
      }
    });
  }

  enableEdit(task: any) {
    this.editTaskId = task._id;
    this.editData = {
      title: task.title,
      description: task.description,
      status: task.status || 'pending'
    };
    // Scroll to edit area if you want (optional)
  }

  cancelEdit() {
    this.editTaskId = null;
    this.editData = { title: '', description: '', status: 'pending' };
  }

  updateTask(taskId: string) {
    if (!this.editData.title?.trim()) {
      this.toastr.warning('Title cannot be empty', 'Validation');
      return;
    }

    this.isUpdating = true;
    this.task.updateTask(taskId, this.editData).subscribe({
      next: (updated) => {
        this.isUpdating = false;
        this.toastr.success('Task updated', 'Success');
        this.editTaskId = null;

        const userId = localStorage.getItem('userId');
        if (userId) this.loadTasks(userId);
      },
      error: (err) => {
        this.isUpdating = false;
        const msg = err?.error?.message || 'Failed to update task';
        this.toastr.error(msg, 'Update Error');
      }
    });
  }

  deleteTask(taskId: string) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.isDeleting = true;
    this.task.deleteTask(taskId).subscribe({
      next: () => {
        this.isDeleting = false;
        this.toastr.success('Task deleted', 'Success');
        const userId = localStorage.getItem('userId');
        if (userId) this.loadTasks(userId);
      },
      error: (err) => {
        this.isDeleting = false;
        const msg = err?.error?.message || 'Failed to delete task';
        this.toastr.error(msg, 'Delete Error');
      }
    });
  }

  toggleStatus(task: any) {
    const updatedStatus = task.status === 'pending' ? 'completed' : 'pending';

    // Optimistic UI update:
    const previous = task.status;
    task.status = updatedStatus;

    this.task.updateTask(task._id, { status: updatedStatus }).subscribe({
      next: () => {
        this.toastr.success(`Marked ${updatedStatus}`, 'Status Updated');
      },
      error: (err) => {
        // rollback
        task.status = previous;
        const msg = err?.error?.message || 'Failed to update status';
        this.toastr.error(msg, 'Status Error');
      }
    });
  }

  // helper for empty state message
  get isEmpty() {
    return !this.isLoading && this.tasks.length === 0;
  }

  getUsername() {
  return localStorage.getItem('username') || 'User';
}

}
