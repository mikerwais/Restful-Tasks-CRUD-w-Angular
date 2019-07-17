import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private _httpService: HttpService){}
    title = "Restful Tasks API"
    tasks : any;
    task : any;
    green = false;
    newTask: any;
    editTask: any;
    editTog: boolean = false;
    ngOnInit(){
    this.newTask = {title:'title your task', description: 'describe your task'}
    }

    getTasksFromService(){
      this._httpService.getTasks().subscribe(data => {
        console.log("Got our tasks!", data);
        this.tasks = data; 
      });
    }

    info(id){
      this._httpService.getTasksById(id).subscribe(data => {
      this.task = data;
      })
    }

    onSubmit(){
      this._httpService.addTask(this.newTask).subscribe(data=>{
      this.newTask = { title: '', description: ''};
      this.getTasksFromService();
    })
    };

    onEdit(task){
      this.editTask = {_id: task._id, title: task.title, description: task.description};
      this.editTog = true;
      };
    
    onUpload(){
      this._httpService.editTask(this.editTask).subscribe(data => {
      this.editTog = false;
      this.getTasksFromService();
      })
    };

    onDelete(task){
      this._httpService.deleteTask(task).subscribe(data => {
        console.log(task);
        this.getTasksFromService();
    })
  };
}
