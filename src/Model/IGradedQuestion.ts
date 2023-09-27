
export interface IGradedQuestion
{
    R1: boolean;
    R2: boolean;
    R3: boolean;
    BR: boolean;
    fMinors: boolean;
    fMajors: boolean;
    fSoftball: boolean;
    fLocal: boolean;
    fFed: boolean;
    fIntermediates: boolean;
    fJuniors: boolean;
    fSeniors: boolean;
    fRegular: boolean;
    fTournament: boolean;
    fBaseball: boolean;
    nDiff: number;
    sLocal: string;
    cOuts:  number;
    cBalls: number;
    cStrikes: number;
    sQuestion: string;
    rgsAnswers: string[];
    nCorrectAnswer: number;
    id: number;
    sRuling: string;
    sLastRulebookChecked: string;
}