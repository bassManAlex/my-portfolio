import { Component, OnInit } from '@angular/core';
import { RandomUserService } from 'src/services/random-user.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first, map, shareReplay } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { DatePipe } from '@angular/common';
interface UserInfo {
  label: string; value: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  appTitle: string;
  otherInfo$: Observable<UserInfo>;
  private userDataMap: Map<string, UserInfo> = new Map<string, UserInfo>([
    ['email', { label: 'My email address is', value: '' }],
    ['dob', { label: 'My birthday is', value: '' }],
    ['location', { label: 'My address is', value: '' }],
    ['phone', { label: 'My phone number is is', value: '' }],
    ['password', { label: 'My password is', value: '' }],
  ]);
  constructor(private randomUserService: RandomUserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.appTitle = 'Portfolio test';

    this.user$ = this.randomUserService.getUser().pipe(
      map((response): User => response.results[0]),
      shareReplay(1),
      catchError((err) => {
        return EMPTY;
      })
    );
  }

  onMouseOver(data) {
    this.otherInfo$ = this.user$.pipe(
      map((user) => {
        const uData = this.userDataMap.get(data);
        switch(data) {
          case 'email':
            uData.value = user.email;
            break;
          case 'dob':
            uData.value = this.datePipe.transform(user.dob.date, 'dd/MM/yyyy');
            break;
          case 'phone':
            uData.value = user.phone;
            break;
            case 'location':
              uData.value = `${user.location.street.number} ${user.location.street.name}`;
            break;
            case 'password':
                uData.value = user.login.password;
              break;
            }
        return uData;
      })
    )
  }
}
