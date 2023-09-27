import React from 'react';
import './App.css';
import { AppHeader } from "./Components/AppHeader";
import { Chooser } from "./Components/Chooser";
import { Intro } from './Components/Intro';
import { IGenerateQuizParams } from './Model/IGenerateQuizParams';
import { WebApiInterop } from "./Controller/WebApiInterop";
import { QuizApi } from "./Controller/quizapi";
import { GradedQuiz } from "./Model/GradedQuiz";
import { Status } from './Components/Status';
import { Question } from "./Components/Question";
import { GradedQuestion } from "./Model/GradedQuestion";
import { IFormClient } from "./Components/IFormClient";
import umpire from "./Assets/umpire.gif";

enum PageState
{
    Start = 0,
    Quizzing = 1,
    Grading = 2
}

export interface AppProps
{
}

export interface AppState
{
    pageState: PageState;
    quiz?: GradedQuiz;
    status: string[];
    servedCount?: number;
}

export class App extends React.Component<AppProps, AppState> implements IFormClient
{
    quizApi: QuizApi;
    values: Map<string, string> = new Map<string, string>();
    generateParams: IGenerateQuizParams = {};
    showDebug: boolean = false;
    showLocal: boolean = false;
    showFed: boolean = false;

    setFormControlValue(id: string, value: string): void
    {
        console.log(`setting [${id}] -> ${value}`)
        this.values.set(id, value);
    }

    getFormControlValue(id: string): string | undefined
    {
        if (this.values.has(id))
            return this.values.get(id);

        return undefined;
    }

    constructor(props: AppProps)
    {
        super(props);

        this.quizApi = new QuizApi("https://tr-functions.azurewebsites.net/api/quiz");
//        this.quizApi = new QuizApi("http://localhost:7082/api/quiz");


        this.state =
        {
            pageState: PageState.Start,
            status: [],
//            quiz: quiz
        }

        const URL = new URLSearchParams(window.location.search);
        if (URL.has("debug"))
            this.showDebug = true;
        if (URL.has("fed"))
            this.showFed = true;
        if (URL.has("local"))
            this.showLocal = true;
    }

    async generateQuiz(params: IGenerateQuizParams)
    {
        this.generateParams = params;
        await this.generateQuizForSavedParams();
    }

    async updateCount()
    {
        const count = await this.quizApi.GetCount();

        this.setState({ servedCount: count });
    }

    componentDidMount()
    {
        this.updateCount();
    }

    async generateQuizForSavedParams()
    {
        this.clearError();
//      const quiz = new GradedQuiz();
//      quiz.addQuestion(
//          new GradedQuestion(
//              {
//                  R1: true, R2: true, R3: true, BR: true,
//                  fBaseball: true, cBalls: 2, cStrikes: 1, cOuts: 1,
//                  fLocal: false, fFed: false, fIntermediates: true, fJuniors: true,
//                  fSeniors: true, fMinors: true, fMajors: true,
//                  fSoftball: true,
//                  sQuestion: "This is my question. Really?",
//                  rgsAnswers: ["Answer1", "Correct Answer2", "Answer3", "Answer4"],
//                  nCorrectAnswer: 2,
//                  sLastRulebookChecked: "2007",
//                  sRuling: "Cuz I said so!",
//                  id: 201,
//                  sLocal: "",
//                  fRegular: true, fTournament: true, nDiff: 0
//              }));
//
//      quiz.addQuestion(
//              new GradedQuestion(
//                  {
//                      R1: true, R2: true, R3: true, BR: true,
//                      fBaseball: true, cBalls: 2, cStrikes: 1, cOuts: 1,
//                      fLocal: false, fFed: false, fIntermediates: true, fJuniors: true,
//                      fSeniors: true, fMinors: true, fMajors: true,
//                      fSoftball: true,
//                      sQuestion: "This is my question. Really?",
//                      rgsAnswers: ["Answer1", "Answer2", "Correct Answer3"],
//                      nCorrectAnswer: 3,
//                      sLastRulebookChecked: "2007",
//                      sRuling: "Cuz I said so!",
//                      id: 201,
//                      sLocal: "",
//                      fRegular: true, fTournament: true, nDiff: 0
//                  }));
//
        let quiz: GradedQuiz;
        try
        {
            quiz = await this.quizApi.GenerateQuiz(this.generateParams);
        }
        catch (error: any)
        {
            this.setState({ status: [error.message] });
            return;
        }

        // reset answers
        this.values.clear();
        for (let i = 0; i < quiz.questions.length; i++)
            this.values.set(`a-q${i + 1}`, "-1");

        this.setState(
            {
                pageState: PageState.Quizzing,
                quiz: quiz
            });
    }

    clearError()
    {
        this.setState({ status: [] });
    }

    gradeQuiz(e: React.MouseEvent<HTMLButtonElement>)
    {
        this.clearError();

        this.setState(
            {
                pageState: PageState.Grading
            }
        );
    }

    render()
    {
        const served = (this.state.servedCount)
            ? (
                <span style={{ background: "green", width: "100%", color: "white", bottom: "0px", height: "4px" }}>
                    <b>{this.state.servedCount} Quizzes served to date...</b>
                </span >)
            : "";

        const maybeChooser =
            this.state.pageState === PageState.Start
                ? (
                    <>
                        <Intro />
                        <hr />
                        <Chooser quizGenerateDelegate={this.generateQuiz.bind(this)} showDebug={this.showDebug} showFed={this.showFed} showLocal={this.showLocal} />
                        {served}
                        <img src={umpire} style={{ right: "0px", bottom: "0px", position: "absolute" }}/>
                    </>)
                : "";

        const questions: React.ReactElement[] = [];

        if ((this.state.pageState === PageState.Quizzing || this.state.pageState === PageState.Grading)
            && this.state.quiz !== undefined)
        {
            for (let _idx = 0; _idx < this.state.quiz.questions.length; _idx++)
            {
                const _question = this.state.quiz.questions[_idx];

                if (this.state.pageState === PageState.Quizzing)
                    questions.push((<Question question={_question} idx={_idx + 1} formClient={this} key={`q${_idx}`} />));
                else
                {
                    const answerKey = `a-q${_idx + 1}`;
                    const selectedAnswer = +(this.values.get(answerKey) ?? -1);

                    questions.push((<Question question={_question} idx={_idx + 1} formClient={this} key={`q${_idx}`} selectedAnswer={selectedAnswer} />));
                }
            }
        }

        let quiz: React.ReactElement = (<></>);

        if (this.state.pageState === PageState.Quizzing && this.state.quiz !== undefined)
        {
            quiz = (
                <>
                    {questions}
                    <button onClick={this.gradeQuiz.bind(this)}>Score Quiz</button>
                </>);
        }
        else if (this.state.pageState === PageState.Grading && this.state.quiz !== undefined)
        {
            quiz = (
                <>
                    {questions}
                    <button onClick={this.generateQuizForSavedParams.bind(this)}>Take Another Quiz</button>
                </>);
        }

        return (
            <div>
                <AppHeader />
                <div className="main">
                    {maybeChooser}
                    {quiz}
                </div>
                <Status status={this.state.status} />
            </div>
        )
    }
}
