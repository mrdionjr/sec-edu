import {Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LessonService } from 'src/app/core/services/lesson/lesson.service';
import {SwalComponent} from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

  responses: any;
  lesson;
  hasSuccedded: boolean;

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const sectionId = params.get('section');
      this.responses = JSON.parse(localStorage.getItem('responses')) || false;
      this.lessonService.getLesson(+sectionId).subscribe(res => this.lesson = res.question);
    });

    this.hasSuccedded = this.isSubmissionSuccessful();

    this.deleteSwal.show();
  }

  ngAfterViewInit() {
    //
  }

  isSubmissionSuccessful() {
    return this.responses;
  }
}
