// project.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://managerback.azurewebsites.net/';
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();
  private projectsLoaded = false;
  private forceUpdate = false;
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    if (!this.projectsLoaded || this.forceUpdate) {
      // If projects aren't loaded, fetch from the API.
      return this.http.get<Project[]>(this.apiUrl + 'Projects').pipe(
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
    return this.http.get<Project>(`${this.apiUrl + 'Projects'}/${id}`);
  }
  addProject(newProject: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + 'Projects', newProject).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }

  deleteProject(id: string): Observable<Object> {
    const url = `${this.apiUrl + 'Projects'}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.forceUpdate = true;
      })
    );
  }
}
