import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: any = 0;
  counter = 60;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  interval$: any;
  progress: string = "0";
  IsTestCompleted:boolean=false;
  constructor(private QuestionService: QuestionService) { }

  ngOnInit(): void {

    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.QuestionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      });

  }

  nextQuestion() {
    this.currentQuestion = this.currentQuestion + 1;

  }
  previousQuestion() {

    this.currentQuestion--;
  }
  answer(currentQno: any, option: any) {
    if(currentQno===this.questionList.length){
      this.IsTestCompleted=true;
      this.stopCounter();
    }
    else{
      this.IsTestCompleted=false;
    }
    if (option.correct) {
      this.points += 10;
      setTimeout(() => {
        this.correctAnswers++;
        this.currentQuestion++;
        this.getProgress();
      }, 1000);

    } else {
      setTimeout(() => {
        this.wrongAnswers++;
        this.currentQuestion++;
        this.getProgress();
      }, 1000);
      this.points -= 10;

    }

  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(res => {
        this.counter--;
        if (this.counter == 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }

      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;

  }

  resetCounter() {

    this.stopCounter();
    this.counter = 60;
    this.startCounter();

  }

  resetQuiz() {
    this.resetCounter();
    this.points = 0;
    this.getAllQuestions();
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }

  getProgress() {

    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }
}
