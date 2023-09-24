import React from 'react';

export class Intro extends React.Component
{
    render()
    {
        return (
            <div className="QuizIntro">
                <p>
                    This interactive quiz has over 300 questions (and growing).&nbsp; These questions have been collected from all
                    over the place. Feel free to send more my way!
                </p>
                <p>
                    The database of questions started
                    out as a learning aid for umpires working Little League games at the majors and
                    below.&nbsp; Over the years, its expanded to included Junior/Senior/Big League and
                    Softball.&nbsp; This year, the database expands yet again to include Federation
                    High School rules (NFHS)!
                </p>
                <p>
                    For each question, I try to cite the rule.&nbsp; When the question was written (barring
                    dyslexia), the correct rule was cited.&nbsp; As rule books change, the rule numbers
                    sometimes drift, so you might have to look around a little to find the exact rule.&nbsp; If a ruling is the same for
                    Fed and OBR, I only cite the OBR rule.&nbsp; If there's something special for Fed,
                    I'll cite the Fed rule.
                </p>
                <p>
                    Some of these questions are specific to High School or Little League, a particular level of Little League or even
                    a specific local Little League.  You can choose to filter out these questions using the options below.  If a question
                    doesn't apply to all baseball/softball, it will note what it does apply to.&nbsp; (If nothing is noted, the rule is
                    the same for all associations, all levels)
                </p>
                <p>
                    If you find any of these questions in error (or you just want to drop me a line), send me mail at <a href="mailto:redmond_blue@yahoo.com">redmond_blue@yahoo.com</a>.
                </p>
            </div >
        );
    }
}
