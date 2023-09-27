
import { IGenerateQuizParams } from "../Model/IGenerateQuizParams";
import { WebApiInterop } from "./WebApiInterop";
import { GradedQuiz } from "../Model/GradedQuiz";
import { IGradedQuestion } from "../Model/IGradedQuestion";
import { GradedQuestion } from "../Model/GradedQuestion";

interface Counter
{
    Count: number;
}

export class QuizApi
{
    private webApiInterop: WebApiInterop;

    constructor(sApiRoot: string)
    {
        this.webApiInterop = new WebApiInterop(sApiRoot);
    }

    async GetCount(): Promise<number>
    {
        const counter = await this.webApiInterop.Fetch<Counter>("counter", []);

        return counter.Count;
    }

    async GenerateQuiz(genParams: IGenerateQuizParams): Promise<GradedQuiz>
    {
        const questions = await this.webApiInterop.FetchPost<GradedQuestion[]>(
            "generateQuiz",
            genParams);

        const quiz = new GradedQuiz();

        for (const question of questions)
            quiz.addQuestion(question);

        return quiz;
    }
}