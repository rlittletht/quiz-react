import { GradedQuestion } from "./GradedQuestion";

export class GradedQuiz
{
    questions: GradedQuestion[] = [];

    addQuestion(question: GradedQuestion)
    {
        this.questions.push(question);
    }
}