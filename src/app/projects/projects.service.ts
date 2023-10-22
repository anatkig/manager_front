// project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://managerback.azurewebsites.net/Projects/';
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();
  private projectsLoaded = false;
  private forceUpdate = false;
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (!this.projectsLoaded || this.forceUpdate) {
      // If projects aren't loaded, fetch from the API.
      return this.http.get<Project[]>(this.apiUrl).pipe(
        tap((projects) => {
          // Utilize tap to capture the response without altering it.
          this.projectsSubject.next(projects);
          this.projectsLoaded = true;
          this.forceUpdate = false;
        })
      );
    } else {
      // If projects are loaded, return the current value.
      return this.projectsSubject.asObservable();
    }
  }
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }
  addProject(newProject: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, newProject).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }

  editProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }

  deleteProject(id: string): Observable<Object> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }
}
