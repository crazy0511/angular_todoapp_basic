import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';


// crud.service.ts để triển khai các logic xử lý dữ liệu or giao tiếp với API 
// Thiết kể để cung cấp các phương thức để truy xuất dữ liệu 

// Sử dụng Injectable thì không phải thêm service vào providers của module nào
// service này được cung cấp ở mọi nơi của ứng dụng
@Injectable({
  providedIn: 'root'
})

// Tạo class "CrudService"
export class CrudService {

  serviceURL: string;

  // Khi 1 instance(đối tượng) của CrudService được inject một instance của HttpClient 
  // HttpClient hỗ trợ các phương thức HTTP như GET, POST, PUT, DELETE, và PATCH để lấy hoặc gửi dữ liệu.
  constructor(private http: HttpClient) {
    this.serviceURL = "https://64abae319edb4181202e4ec9.mockapi.io/api/todoapp";
  }

  // Thực hiện việc gửi yêu cầu HTTP POST đến một API endpoint để thêm một task mới vào hệ thống

  // Phương thức này trả về một Observable của kiểu dữ liệu Task
  // Observable đại diện cho một chuỗi các sự kiện hoặc giá trị
  // Observable -> Cho phép các thành phần khác của ứng dụng subscribe để lắng nghe và xử lý các sự kiện hoặc giá trị đó khi chúng được phát ra
  // addTask -> Cho phép các thành phần khác của ứng dụng có thể subscribe và nhận các kết quả trả về từ yêu cầu HTTP này.
  addTask(task: Task): Observable<Task> {
    // this.http.post() được sử dụng để gửi yêu cầu HTTP POST đến API endpoint được cung cấp bởi this.serviceURL
    // Tham số đầu tiên của phương thức post() là đường dẫn của API endpoint
    // Tham số thứ hai là dữ liệu cần gửi đến API endpoint -> task 
    return this.http.post<Task>(this.serviceURL, task);
  }

  // getTask -> được sử dụng để gửi yêu cầu HTTP GET đến một API endpoint để lấy danh sách các task từ hệ thống. 
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL);
  }

  // deleteTask -> được sử dụng để gửi yêu cầu HTTP DELETE đến một API endpoint để xóa 1 task từ hệ thống. 
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id);
  }

  // editTask -> được sử dụng để gửi yêu cầu HTTP PUT đến một API endpoint để cập nhật 1 task từ hệ thống. 
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id, task);
  }
}
