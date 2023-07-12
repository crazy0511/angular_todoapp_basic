import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

// Service dùng chung không phải khai báo vào module
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL: string;

  // Khởi tạo đối tường http
  constructor(private http: HttpClient) {
    this.serviceURL = "https://64abae319edb4181202e4ec9.mockapi.io/api/todoapp";
  }

  // Thực hiện việc gửi yêu cầu HTTP POST đến một API endpoint để thêm một task mới vào hệ thống. 
  // task là đối tượng truyền vào
  // Observable<Task>: là một Observable của kiểu dữ liệu Task, đại diện cho kết quả trả về từ yêu cầu HTTP POST.
  // this.http.post() được sử dụng để gửi yêu cầu HTTP POST đến API endpoint được cung cấp bởi this.serviceURL.
  // Tham số đầu tiên của phương thức post() là đường dẫn của API endpoint
  // Tham số thứ hai là dữ liệu cần gửi đến API endpoint --> task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }

  // Kết quả trả về là Array Task lấy từ Database
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
