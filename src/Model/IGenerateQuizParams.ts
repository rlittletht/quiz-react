
// must remain in sync with https://github.com/rlittletht/quizFn/blob/master/Model/GenerateQuizParams.cs

export interface IGenerateQuizParams
{
    Minors?: string;
    Majors?: string;
    Intermediates?: string;
    Juniors?: string;
    Seniors?: string;
    Baseball?: string;
    Softball?: string;
    NFHS?: string;
    Diff1?: string;
    Diff2?: string;
    Diff3?: string;
    Diff4?: string;
    Regular?: string;
    Tournament?: string;
    SpecificQuestions?: string;
    QuestionCount?: string;
    LocalLeague?: string;
    LocalRule?: string;
}
