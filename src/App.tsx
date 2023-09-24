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
}

export class App extends React.Component<AppProps, AppState>
{
    quizApi: QuizApi;

    constructor(props: AppProps)
    {
        super(props);

//        this.quizApi = new QuizApi("https://tr-functions.azurewebsites.net/api/quiz");
        this.quizApi = new QuizApi("http://localhost:7082/api/quiz");

        this.state =
        {
            pageState: PageState.Start,
            status: []
        }
    }

    async generateQuiz(params: IGenerateQuizParams)
    {
        let quiz: GradedQuiz;
        try
        {
            quiz = await this.quizApi.GenerateQuiz(params);
        }
        catch (error: any)
        {
            this.setState({ status: [error.message] });
            return;
        }

        this.setState(
            {
                pageState: PageState.Quizzing,
                quiz: quiz
            });
    }

    render()
    {
        const maybeChooser =
            this.state.pageState === PageState.Start
                ? (
                    <>
                        <Intro />
                        <hr />
                        <Chooser quizGenerateDelegate={this.generateQuiz.bind(this)} />
                    </>)
                : "";

        return (
            <div>
                <AppHeader />
                <div className="main">
                    {maybeChooser}
                </div>
                <Status status={this.state.status} />
            </div>
        )
    }
}
