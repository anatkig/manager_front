import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Task {
  id: string;
  name: string;
  description: string;
  projectId: string; // Assuming it's a string type. Change it if it's different in your case
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'https://managerback.azurewebsites.net/Tasks';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.apiURL)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Get all tasks
  getTasksByProjectId(projectId: string): Observable<Task[]> {
    const params = new HttpParams().set('projectId', projectId);
    const urlWithSegment = `${this.apiURL}/byproject`;
    return this.http
      .get<Task[]>(urlWithSegment, { params: params })
      .pipe(retry(1), catchError(this.handleError));
  }
  // Get single task by id
  getTask(id: string): Observable<Task> {
    return this.http
      .get<Task>(`${this.apiURL}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Create a new task
  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.apiURL, task)
      .pipe(catchError(this.handleError));
  }

  // Update a task
  updateTask(id: string, task: Task): Observable<Task> {
    return this.http
      .put<Task>(`${this.apiURL}/${id}`, JSON.stringify(task), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http
      .delete<Task>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
