import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

// @Injectable là một decorator trong Angular, được sử dụng để cho phép Angular tạo và quản lý instances của một class.
// Chúng ta không cần phải thêm service vào danh sách providers của một module nào đó trong ứng dụng
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "https://64abae319edb4181202e4ec9.mockapi.io/api/todoapp";
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id, task);
  }
}
