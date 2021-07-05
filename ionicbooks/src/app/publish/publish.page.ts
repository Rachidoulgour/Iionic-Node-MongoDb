import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-publish',
  templateUrl: './publish.page.html',
  styleUrls: ['./publish.page.scss'],
})
export class PublishPage implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      purpose:  new FormControl(null, {
        validators: [Validators.required]
      }),
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      author:  new FormControl(null, {
        validators: [Validators.required]
      }),
      text: new FormControl(null, {
        validators: [Validators.required]
      }),
      file:  new FormControl(null),
      
      })
    
  }

}
