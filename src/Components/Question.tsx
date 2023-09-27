import React, { CSSProperties } from 'react';
import { GradedQuestion } from "../Model/GradedQuestion";
import { Radio } from './Radio';
import { IFormClient } from "./IFormClient";

export interface QuestionProps
{
    question: GradedQuestion;
    idx: number;
    selectedAnswer?: number;
    formClient: IFormClient
}

export interface QuestionState
{
}

export class Question extends React.Component<QuestionProps, QuestionState>
{
    constructor(props: QuestionProps)
    {
        super(props);
    }

    static buildOnOffStringForCount(onCount: number, total: number): { on: string, off: string }
    {
        let on: string = "";
        let off: string = "";

        for (let i = 0; i < total; i++)
        {
            if (i < onCount)
                on += "l";
            else
                off += "l";
        }
        return { on: on, off: off };
    }

    static formatCount(base: string, count: number): string
    {
        if (count == 0)
            return `No ${base}s`;
        else if (count == 1)
            return `1 ${base}`;
        else
            return `${count} ${base}s`;
    }

    static buildSituationFromQuestion(question: GradedQuestion):
        {
            outs: React.ReactNode,
            outsOn: React.ReactNode,
            outsOff: React.ReactNode,
            balls: React.ReactNode,
            ballsOn: React.ReactNode,
            ballsOff: React.ReactNode,
            strikes: React.ReactNode,
            strikesOn: React.ReactNode,
            strikesOff: React.ReactNode,
            situation: React.ReactNode
        }
    {
        const runnerArray = [];
        if (question.R1)
            runnerArray.push("1st");
        if (question.R2)
            runnerArray.push("2nd");
        if (question.R3)
            runnerArray.push("3rd");

        let runnersString = "";

        if (runnerArray.length == 3)
            runnersString = "  Bases are loaded.";
        else if (runnerArray.length > 0)
        {
            if (runnerArray.length == 1)
                runnersString = "  Runner on ";
            else
                runnersString = "  Runners on ";

            runnersString += runnerArray.join(", ") + ".";
        }

        const runners = runnersString == "" ? (<></>) : (<>{runnersString}&nbsp;&nbsp;</>);

        if (!question.cStrikes && !question.cBalls && !question.cOuts)
        {
            return {
                outs: (<></>),
                outsOn: (<></>),
                outsOff: (<></>),
                balls: (<></>),
                ballsOn: (<></>),
                ballsOff: (<></>),
                strikes: (<></>),
                strikesOn: (<></>),
                strikesOff: (<></>),
                situation: (<>{runners}</>)
            };
        }

        const { on: outsOn, off: outsOff } = this.buildOnOffStringForCount(question.cOuts, 3);
        const { on: ballsOn, off: ballsOff } = this.buildOnOffStringForCount(question.cBalls, 4);
        const { on: strikesOn, off: strikesOff } = this.buildOnOffStringForCount(question.cStrikes, 3);


        return {
            outs: (<>Outs:</>),
            outsOn: (<>{outsOn}</>),
            outsOff: (<>{outsOff}</>),
            balls: (<>Balls:</>),
            ballsOn: (<>{ballsOn}</>),
            ballsOff: (<>{ballsOff}</>),
            strikes: (<>Strikes:</>),
            strikesOn: (<>{strikesOn}</>),
            strikesOff: (<>{strikesOff}</>),
            situation: (<>{Question.formatCount("ball", question.cBalls)}, {Question.formatCount("strike", question.cStrikes)}, {Question.formatCount("out", question.cOuts)}.{runners}</>)
        };
    }

    static buildRunnersFromQuestion(question: GradedQuestion): React.ReactNode[]
    {
        const runners = [];

        runners.push(question.BR ? (<>BR</>) : (<>&nbsp;&nbsp;&nbsp;&nbsp;</>));
        runners.push(question.R1 ? (<>R1</>) : (<>&nbsp;&nbsp;&nbsp;&nbsp;</>));
        runners.push(question.R2 ? (<>R2</>) : (<>&nbsp;&nbsp;&nbsp;&nbsp;</>));
        runners.push(question.R3 ? (<>R3</>) : (<>&nbsp;&nbsp;&nbsp;&nbsp;</>));

        return runners;
    }

    static buildSpecialBannerTextFromQuestion(question: GradedQuestion): React.ReactNode
    {
        let s = "";

        const fUpperDivision = question.fIntermediates || question.fJuniors || question.fSeniors;

        if (question.fFed && !fUpperDivision && !question.fMajors && !question.fMinors)
            s += "NFHS only. ";
        else if (!question.fFed && (fUpperDivision && question.fMajors && question.fMinors))
            s += "Little League only. ";
        else
        {
            if (fUpperDivision)
            {
                if (!question.fMajors && !question.fMinors)
                {
                    if (question.fFed)
                        s += "90' diamond only. ";
                    else
                        s += "Little League Upper Division only. ";
                }
                else
                {
                    if (question.fMajors && !question.fMinors)
                    {
                        if (question.fFed)
                            s += "Little League Majors, Upper Division, NFHS only. ";
                        else
                            s += "Little League Majors and Upper Division only";
                    }
                }
            }
            else
            {
                if (!question.fMinors || !question.fMajors)
                {
                    if (question.fMajors)
                    {
                        if (question.fFed)
                            s += "NFHS, Little League Majors only. ";
                        else
                            s += "Little League Majors only. ";
                    }
                    else
                    {
                        if (!question.fFed)
                            s += "NFHS, Little League Minors only. ";
                        else
                            s += "Little League Minors only. ";
                    }
                }
                else
                {
                    if (question.fFed)
                        s += "NFHS, Little League Minors/Majors only. ";
                    else
                        s += "Little League Minors/Majors only. ";
                }
            }
        }

        if (question.fSoftball && !(question.fMinors || question.fMajors || fUpperDivision))
        {
            if (question.fFed)
                s += "Softball only. ";
            else
                s += "Little League Softball only. ";
        }

        if (question.fIntermediates && !question.fJuniors && !question.fSeniors && !question.fMinors && !question.fMajors)
            s += "Intermediates Baseball only. ";

        if (question.fJuniors && !question.fIntermediates && !question.fSeniors && !question.fMinors && !question.fMajors)
            s += "Juniors only. ";

        if (question.fSeniors && !question.fJuniors && !question.fIntermediates && !question.fMinors && !question.fMajors)
            s += "Seniors only. ";

        if (!question.fSoftball && question.fBaseball)
            s += "Baseball only. ";

        if (!question.fBaseball && question.fSoftball)
            s += "Softball only. ";

        if (!question.fRegular && question.fTournament)
            s += "Tournament only. ";

        if (!question.fTournament && question.fRegular)
            s += "Regular season only. ";

        return s === "" ? (<></>) : (<><p style={{marginBottom: ".7rem"}} className="TightSpacing">{s}</p></>);
    }

    render()
    {
        const center: CSSProperties = { textAlign: 'center' };
        const right: CSSProperties = { textAlign: 'right' };
        const runnerBase: CSSProperties = { position: 'relative', width: '16px', height: '16px', border: '1pt solid brown' };
        const runnerTop = { ...runnerBase, bottom: '1px', left: '1px' };
        const runnerLeft = { ...runnerBase, right: '1px', top: '1px' };
        const runnerRight = { ...runnerBase, left: '1px', top: '1px' };
        const runnerBottom = { ...runnerBase, top: '1px', left: '1px' };
        const diamondStyle: CSSProperties = { borderCollapse: 'collapse', fontSize: '8pt' };
        const diamondTd: CSSProperties = { verticalAlign: 'top', paddingRight: '2pt' };

        const indicatorOn: CSSProperties = { fontFamily: 'wingdings', color: 'rgb(28,224,28)' };
        const indicatorOff: CSSProperties = { fontFamily: 'wingdings', color: 'rgb(0,0,0' };
        const blownCall: CSSProperties = { fontWeight: 800, color: 'red' };
        const goodCall: CSSProperties = { fontWeight: 800, color: 'blue' };

        const centerChildren: CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'center' };
        const imgStyle: CSSProperties = {
            width: '110px', height: '109px', padding: '1pt', background: 'url("/diamond.jpg")'
        };

        const {
            outs,
            outsOn,
            outsOff,
            balls,
            ballsOn,
            ballsOff,
            strikes,
            strikesOn,
            strikesOff,
            situation } = Question.buildSituationFromQuestion(this.props.question);

        const runners = Question.buildRunnersFromQuestion(this.props.question);

        const specialBanner = Question.buildSpecialBannerTextFromQuestion(this.props.question);

        const questionText = (<>{this.props.question.sQuestion}</>);

        // need to make this a manual loop checking for empty answers -- push only if there is one
        let answerBlock: React.ReactElement;

        if (this.props.selectedAnswer === undefined)
        {
            const answers: React.ReactElement[] = [];

            for (let _idx = 0; _idx < this.props.question.rgsAnswers.length; _idx++)
            {
                const answer = this.props.question.rgsAnswers[_idx];

                if ((answer ?? "") !== "")
                {
                    answers.push(
                        (
                            <tr key={`a-q${this.props.idx}-a${_idx}`}>
                                <td><Radio name={`a-q${this.props.idx}`} id={`a-q${this.props.idx}-a${_idx}`} client={this.props.formClient} value={`${_idx + 1}`} /></td>
                                <td><label htmlFor={`a-q${this.props.idx}-a${_idx}`}>{answer}</label></td>
                            </tr>
                        ));
                }
            }

            // the answer index for "none" is "-1"
            answers.push(
                (<tr key={`a-q$(this.props.idx}-a-1`}><td><Radio name={`a-q${this.props.idx}`} id={`a-q$(this.props.idx}-a-1`} client={this.props.formClient} value={"-1"} /></td><td><label htmlFor={`a-q$(this.props.idx}-a-1`}>No answer</label> </td></tr>));

            answerBlock = (<>{answers}</>);
        }
        else
        {
            const answerIndex = this.props.selectedAnswer ?? -1;
            const answer = answerIndex > 0 && answerIndex <= this.props.question.rgsAnswers.length ? this.props.question.rgsAnswers[answerIndex - 1] : "No answer";
            const callType = this.props.selectedAnswer == this.props.question.nCorrectAnswer
                ? (<p className="TightSpacing" style={goodCall}>GOOD CALL!</p>)
                : (<>
                    <p className="TightSpacing" style={blownCall}> OH NO! BLOWN CALL!</p>
                    <p className="TightSpacing"><b>Correct answer:</b> {this.props.question.rgsAnswers[this.props.question.nCorrectAnswer - 1]}</p>
                </>);

            answerBlock = (
                <>
                    <tr key={`a-q${this.props.idx}-ruling}`}>
                        <td>
                            <p className="TightSpacing"><b>Your answer:</b> {answer}</p>
                            {callType}
                            <p className="TightSpacing"><b>Ruling:</b> {this.props.question.sRuling}</p>
                        </td>
                    </tr>
                </>);
        }

        return (
            <div>
                <p>
                    <b>Question {this.props.idx}</b> [{this.props.question.id}]:
                </p >
                <table className="LayoutTable">
                    <tbody>
                        <tr>
                            <td style={{ verticalAlign: "top" }}>
                                <table width={140} border={0} cellSpacing={0} cellPadding={0} style={{ borderCollapse: 'collapse', fontSize: '8pt' }} >
                                    <tbody>
                                        <tr>
                                            <td width={15} />
                                            <td width={110} style={{ paddingBottom: '1pt' }}>
                                                <p className="NoSpacing" style={center}><span style={runnerTop}><b>{runners[2]}</b></span></p>
                                            </td>
                                            <td width={15} />
                                        </tr>
                                        <tr>
                                            <td width={10}>
                                                <p className="NoSpacing" style={center}>
                                                    <span style={runnerLeft}><b>{runners[3]}</b></span></p></td>
                                            <td width={110} style={imgStyle} >
                                                <div style={centerChildren}>
                                                    <table width={60} cellSpacing={0} cellPadding={0} style={diamondStyle}>
                                                        <tbody>
                                                            <tr>
                                                                <td style={diamondTd}>
                                                                    <p className="NoSpacing" style={right}>{balls}</p>
                                                                </td>
                                                                <td valign="top">
                                                                    <p className="NoSpacing">
                                                                        <span style={indicatorOn}>{ballsOn}</span>
                                                                        <span style={indicatorOff}>{ballsOff}</span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={diamondTd}>
                                                                    <p className="NoSpacing" style={right}>{strikes}</p>
                                                                </td>
                                                                <td valign="top" >
                                                                    <p className="NoSpacing">
                                                                        <span style={indicatorOn}>{strikesOn}</span>
                                                                        <span style={indicatorOff}>{strikesOff}</span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={diamondTd}>
                                                                    <p className="NoSpacing" style={right}>{outs}</p></td>
                                                                <td valign="top" >
                                                                    <p className="NoSpacing">
                                                                        <span style={indicatorOn}>{outsOn}</span>
                                                                        <span style={indicatorOff}>{outsOff}</span>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td >
                                            <td width={10}>
                                                <p className="NoSpacing" style={center}>
                                                    <span style={runnerRight}><b>{runners[1]}</b></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td />
                                            <td style={{paddingTop: '1pt'} }>
                                                <p className="NoSpacing" style={center}>
                                                    <span style={runnerBottom}><b>{runners[0]}</b></span>
                                                </p>
                                            </td>
                                            <td />
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style={{ verticalAlign: 'top', paddingLeft: ".5rem" }}>
                                {specialBanner}{situation}{questionText}

                                <table className="LayoutTable" style={{marginTop: "0.5rem"} }>
                                    <tbody>
                                        
                                    {answerBlock}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br style={{ clear: "both" }}/> <hr/>
            </div>
        );
    }
}
