import React from 'react';
import './App.css';
import { AppHeader } from "./Components/AppHeader";
import { Chooser } from "./Components/Chooser";
import { Intro } from './Components/Intro';

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
}

export class App extends React.Component<AppProps, AppState>
{
    constructor(props: AppProps)
    {
        super(props);
        this.state =
        {
            pageState: PageState.Start
        }
    }

    render()
    {
        const maybeChooser =
            this.state.pageState === PageState.Start
                ? (
                    <>
                        <Intro />
                        <hr />
                        <Chooser />
                    </>)
                : "";

        return (
            <div>
                <AppHeader />
                <div className="main">
                    {maybeChooser}
                </div>
            </div>
        )
    }
}
