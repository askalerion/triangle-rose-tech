import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { MdDialog, MdDialogConfig } from '@angular/material';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { MyEvent } from "../models/event";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { CreateEventComponent } from "../create-event/create-event.component";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  eventStream: FirebaseListObservable<Event[]>;

  readonly eventPath = 'events';
  constructor(public authService: AuthService, private db: AngularFireDatabase, private dialog: MdDialog){
    this.eventStream = this.db.list(this.eventPath);
  }

   get numColumns(): number{
    if(window.innerWidth < 500){
      return 1;
    }else if(window.innerWidth < 900){
      return 2;
    }
    else if(window.innerWidth < 1300){
      return 3;
    }
    else{
      return 4;
    }
  }

  ngOnInit() {
     
  }

    showEventDialog(): void{
    console.log("show dialog");
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {firebasePath: `/events`};
    this.dialog.open( CreateEventComponent, dialogConfig);
  }

}
