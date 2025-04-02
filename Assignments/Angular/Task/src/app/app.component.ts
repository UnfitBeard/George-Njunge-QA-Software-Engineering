import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'toDolist';
  myTasks: any[] = [{
    name: "MyTask1",
    duration: 20
  }]
  name: string = '';
  duration: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTasks()
  }

  fetchTasks() {
    this.http.get<any[]>("http://localhost:5000/api/v1/getTasks").subscribe(
      (data) => {
        this.myTasks = data;
        console.log("Tasks Fetched", this.myTasks);
      },
      (error) => {
        console.log('Error Fetching Tasks:', error)
      }
    );
  }

  async onClick() {
    //this.myTasks.push({name: this.name, duration: this.duration});
    //console.log(this.myTasks)

    //Make a post request
    try {
      if (!this.name || !this.duration) {
        alert("Please fill out both title and duration.");
        return;
      }
      const newTask = { title: this.name, duration: this.duration };
      const response = await this.http.post('http://localhost:5000/api/v1/newTask', newTask).toPromise();
      console.log('Task Saved Successfully:', response);
      this.fetchTasks()
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  async deleteTask(taskID: number) {
    console.log("Delete task triggered for ID:", taskID); // This helps debug if it's being called

    try {
      const response = await this.http.delete(`http://localhost:5000/api/v1/deleteTask/${taskID}`).toPromise();
      console.log("Task deleted successfully:", response);

      // Update the local tasks list to exclude the deleted task
      this.myTasks = this.myTasks.filter(task => task.id !== taskID);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

}
