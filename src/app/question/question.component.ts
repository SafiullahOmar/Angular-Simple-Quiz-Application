import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name:string ="";
  constructor(private QuestionService:QuestionService) { }

  ngOnInit(): void {

    this.name=localStorage.getItem("name")!;
  }

  getAllQuestions(){
      this.QuestionService.getQuestionJson()
      .subscribe(res=>{
        console.log(res);
      });

  }

}
