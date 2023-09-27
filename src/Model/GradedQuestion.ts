import { IGradedQuestion } from "./IGradedQuestion";

export class GradedQuestion implements IGradedQuestion
{
    R1: boolean = false;
    R2: boolean = false;
    R3: boolean = false;
    BR: boolean = false;
    fMinors: boolean = false;
    fMajors: boolean = false;
    fSoftball: boolean = false;
    fLocal: boolean = false;
    fFed: boolean = false;
    fIntermediates: boolean = false;
    fJuniors: boolean = false;
    fSeniors: boolean = false;
    fRegular: boolean = false;
    fTournament: boolean = false;
    fBaseball: boolean = false;
    nDiff: number = 0;
    sLocal: string = "";
    cOuts: number =    0;
    cBalls: number =   0;
    cStrikes: number = 0;
    sQuestion: string = "";
    rgsAnswers: string[] = [];
    nCorrectAnswer: number = 0;
    id: number = 0;
    sRuling: string = "";
    sLastRulebookChecked: string = "";

    constructor(i: IGradedQuestion)
    {
        this.R1 = i.R1;
        this.R2 = i.R2;
        this.R3 = i.R3;
        this.BR = i.BR;
        this.fMinors = i.fMinors;
        this.fMajors = i.fMajors;
        this.fSoftball = i.fSoftball;
        this.fLocal = i.fLocal;
        this.fFed = i.fFed;
        this.fIntermediates = i.fIntermediates;
        this.fJuniors = i.fJuniors;
        this.fSeniors = i.fSeniors;
        this.fRegular = i.fRegular;
        this.fTournament = i.fTournament;
        this.fBaseball = i.fBaseball;
        this.nDiff = i.nDiff;
        this.sLocal = i.sLocal;
        this.cOuts = i.cOuts;
        this.cBalls = i.cBalls;
        this.cStrikes = i.cStrikes;
        this.sQuestion = i.sQuestion;
        this.rgsAnswers = i.rgsAnswers;
        this.nCorrectAnswer = i.nCorrectAnswer;
        this.id = i.id;
        this.sRuling = i.sRuling;
        this.sLastRulebookChecked = i.sLastRulebookChecked;
    }
}