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
}