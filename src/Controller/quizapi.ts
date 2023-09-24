
import { IGenerateQuizParams } from "../Model/IGenerateQuizParams";
import { WebApiInterop } from "./WebApiInterop";
import { GradedQuiz } from "../Model/GradedQuiz";
import { IGradedQuestion } from "../Model/IGradedQuestion";
import { GradedQuestion } from "../Model/GradedQuestion";

export class QuizApi
{
    private webApiInterop: WebApiInterop;

    constructor(sApiRoot: string)
    {
        this.webApiInterop = new WebApiInterop(sApiRoot);
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