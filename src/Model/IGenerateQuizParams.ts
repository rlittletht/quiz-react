
// must remain in sync with https://github.com/rlittletht/quizFn/blob/master/Model/GenerateQuizParams.cs

export interface IGenerateQuizParams
{
    Minors?: boolean;
    Majors?: boolean;
    Intermediates?: boolean;
    Juniors?: boolean;
    Seniors?: boolean;
    Baseball?: boolean;
    Softball?: boolean;
    NFHS?:  boolean;
    Diff1?: boolean;
    Diff2?: boolean;
    Diff3?: boolean;
    Diff4?: boolean;
    Regular?: boolean;
    Tournament?: boolean;
    SpecificQuestions?: number[];
    QuestionCount?: number;
    LocalLeague?: string;
    LocalRule?: boolean;
}
