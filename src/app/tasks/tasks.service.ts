import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, tap } from 'rxjs';
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
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
  private tasksLoaded = false;
  private forceUpdate = false;

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

  getTasks(): Observable<Task[]> {
    if (!this.tasksLoaded || this.forceUpdate) {
      return this.http.get<Task[]>(this.apiURL).pipe(
        tap((tasks) => {
          this.tasksSubject.next(tasks);
          this.tasksLoaded = true;
          this.forceUpdate = false;
        }),
        retry(1),
        catchError(this.handleError) // Make sure you have a handleError function defined
      );
    } else {
      return this.tasksSubject.asObservable();
    }
  }

  // Get all tasks by projectId
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
    return this.http.post<Task>(this.apiURL, task).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }

  // Update a task
  editTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiURL}/${id}`, task).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }

  // Delete a task
  deleteTask(id: string): Observable<Object> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }
}
