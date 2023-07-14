import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

// OnInit là 1 interface 
// Một lớp (class) có thể implement (thực thi) một hoặc nhiều interface bằng cách 
// cung cấp các thân (implementation) cho các phương thức và thuộc tính được định nghĩa trong interface đó.
export class DashboardComponent implements OnInit{

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService){
  }

  ngOnInit(): void{
    // Khởi tạo các biến và lấy dữ liệu từ API
    this.editTaskValue = '';  //string
    this.addTaskValue = '';   //string
    this.taskObj = new Task();//Task
    this.taskArr = [];        //array: lưu trữ array task trong database
    this.getAllTask();      
    // console.log('editTaskValue', this.editTaskValue)
    // console.log('addTaskValue', this.addTaskValue)
    // console.log(this.taskObj)
    // console.log(this.taskArr)
    // console.log(this.getAllTask())

  }

  // 1. Gọi API getAllTask() từ CrudService để lấy danh sách các task.
  // 2. Nếu thành công, sẽ lưu kết quả trả về (đó là một mảng các task) vào biến taskArr.
  // 3. Nếu thất bại (err), sẽ hiện thông báo "Unable to get list of tasks" cho người dùng.
  getAllTask(){
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    })
  }

  addTask(){
    // Nếu addTaskValue không rỗng thì thực hiện lệnh trong if
    if(this.addTaskValue != ''){
      // Gán task_name = addTaskValue
      this.taskObj.task_name = this.addTaskValue;
      // Thực hiện lệnh addTask trong CrudService
      // this.taskObj là đối tượng task cần thêm, chứa các thông tin của task.
      // 1. Gọi hàm addTask() từ CrudService để thêm task mới.
      // 2. Nếu thêm thành công, Gọi hàm ngOnInit() để cập nhật lại danh sách task mới. Reset biến addTaskValue trở về rỗng.
      this.crudService.addTask(this.taskObj).subscribe(res => {
        // console.log('editTaskValue', this.editTaskValue)
        // console.log('addTaskValue', this.addTaskValue)
        // console.log(this.taskObj)
        // console.log(this.taskArr)
        // console.log(this.getAllTask())
        this.ngOnInit();
        this.addTaskValue = '';
      }, err => {
        alert(err);
      })
    }
  }


  editTask(){
    if(this.editTaskValue != ''){
      this.taskObj.task_name = this.editTaskValue;
      this.crudService.editTask(this.taskObj).subscribe(res => {
        this.ngOnInit();
      }, err => {
        alert("Failed to update task");
    })
    }
  }


  // 1. Nó nhận vào một đối tượng Task là task cần xóa, được truyền vào hàm dưới dạng đối số etask.
  // 2. Gọi API deleteTask() từ CrudService để xóa task đó.
  // 3. Nếu xóa thành công, gọi lại hàm ngOnInit() để cập nhật lại danh sách task mới sau khi xóa.
  // 4. Nếu xóa thất bại, hiện thông báo lỗi cho người dùng.
  deleteTask(etask: Task){
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete task");
    });
  }

  call(etask: Task){
    // taskOjb = etask
    this.taskObj = etask;
    // editTaskValue = task_name
    this.editTaskValue = etask.task_name;
  }

  dTask: Task = new Task();
  callDeleteTask(deleteTask: Task){
    this.dTask = deleteTask;
  }
}
