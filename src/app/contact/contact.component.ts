import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	title: string = 'UNIST';
  lat: number = 35.571767;
  lng: number = 129.187371;

	feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
	
	submitted: boolean = false;
  
  constructor(
		private fb: FormBuilder,
		private feedbackService: FeedbackService
	) { 
    this.createForm();
  }

  ngOnInit() {
  }
	
  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)] ]
    });
  }
  
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.postFeedback(this.feedback)
		.subscribe(feedback => { 
			this.submitted = true;
			this.feedbackForm.reset({
				firstname: '',
				lastname: '',
				telnum: '',
				email: '',
				agree: false,
				contacttype: 'None',
				message: ''
			});
		}, (err) => {
					this.submitted = false;
		});
    
  }
}
