import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUser: any = null;
  selectedPost: any = null;

  usersForm = new FormGroup({
    selectedUser: new FormControl(null),
    selectedPost: new FormControl(null),
  });

  constructor(private http: HttpClient) {}

  fetchUsers() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').subscribe(
      (response) => {
        this.users = response;
        if (this.users.length) {
          this.usersForm.patchValue({ selectedUser: this.users[0].id });
          this.updateSelectedUser(this.users[0].id);
        }
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  fetchPosts(userID: number) {
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`).subscribe(
      (response) => {
        this.posts = response;
        if (this.posts.length) {
          this.usersForm.patchValue({ selectedPost: this.posts[0].id });
          this.updateSelectedPost(this.posts[0].id);
        }
      },
      (error) => console.error('Error fetching posts:', error)
    );
  }

  fetchComments(postID: number) {
    this.http.get<any[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`).subscribe(
      (response) => (this.comments = response),
      (error) => console.error('Error fetching comments:', error)
    );
  }

  updateSelectedUser(userId: number) {
    this.selectedUser = this.users.find((user) => user.id === userId);
    this.fetchPosts(userId);
  }

  updateSelectedPost(postId: number) {
    this.selectedPost = this.posts.find((post) => post.id === postId);
    this.fetchComments(postId);
  }

  ngOnInit() {
    this.fetchUsers();
    this.usersForm.get('selectedUser')?.valueChanges.subscribe((userId) => {
      if (userId) this.updateSelectedUser(userId);
    });

    this.usersForm.get('selectedPost')?.valueChanges.subscribe((postId) => {
      if (postId) this.updateSelectedPost(postId);
    });
  }
}
