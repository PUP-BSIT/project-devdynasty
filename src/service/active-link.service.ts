import { BehaviorSubject } from 'rxjs';

export class ActiveLinkService {
  private activeLinkSubject = new BehaviorSubject<string>('home');
  activeLink$ = this.activeLinkSubject.asObservable();

  setActiveLink(link: string) {
    this.activeLinkSubject.next(link);
  }
}
