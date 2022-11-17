import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event$: Observable<Event>= this.ar.params.pipe(
    switchMap(params => this.eventService.get(params['id'])),
  )

  constructor(
    private ar:ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.event$)
  }


  onUpdate(eventForm: NgForm): void {
    this.eventService.update(eventForm.value).subscribe((event) => {
      this.router.navigate(['/']);
    });
    //console.log(eventForm.value)
  }
}
