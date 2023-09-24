import React, { CSSProperties } from 'react';
import { Checkbox } from './Checkbox';
import { IFormClient } from './IFormClient';
import { Legend } from './Legend';
import { Dropdown, IDropdownOption } from "./Dropdown";
import { Textbox } from './Textbox';

export class Chooser extends React.Component implements IFormClient
{
    values: Map<string, string> = new Map<string, string>();

    mapFormIdsToQuizParams: Map<string, string> = new Map<string, string>(
        [
            ["idMinors", "Minors"],
            ["idMajors", "Majors"],
            ["idIntermediates", "Intermediates"],
            ["idJuniors", "Juniors"],
            ["idSeniors", "Seniors"],
            ["idBaseball", "Baseball"],
            ["idSoftball", "Softball"],
            ["idFed", "NFHS"],
            ["idDiff1", "Diff1"],
            ["idDiff2", "Diff2"],
            ["idDiff3", "Diff3"],
            ["idDiff4", "Diff4"],
            ["idRegular", "Regular"],
            ["idTournament", "Tournament"],
            ["idQDebug", "SpecificQuestions"],
            ["idCount", "QuestionCount"],
            ["idLocal", "LocalLeague"]
        ]);

    constructor(props: any)
    {
        super(props);

        this.values.set("idMinors", "1");
        this.values.set("idMajors", "1");
        this.values.set("idIntermediates", "1");
        this.values.set("idJuniors", "1");
        this.values.set("idSeniors", "1");
        this.values.set("idBaseball", "1");
        this.values.set("idSoftball", "1");
        this.values.set("idRegular", "1");
        this.values.set("idTournament", "1");
        this.values.set("idDiff1", "1");
        this.values.set("idDiff2", "1");
    }

    generateQuizClick(e: React.MouseEvent<HTMLButtonElement>)
    {
        const params = {};

        for (const key of this.values.keys())
            (params as any)[this.mapFormIdsToQuizParams.get(key) as string] = this.values.get(key);

        alert(`collected: ${JSON.stringify(params)}`);
    }

    setFormControlValue(id: string, value: string): void
    {
        console.log(`setting [${id}] -> ${value}`)
        this.values.set(id, value);
    }

    getFormControlValue(id: string): string | undefined
    {
        if (this.values.has(id))
            return this.values.get(id);

        return undefined;
    }

    render()
    {
        const countOptions: IDropdownOption[] =
            [
                { value: "3", text: "3" },
                { value: "5", text: "5" },
                { value: "10", text: "10" },
                { value: "15", text: "15" },
            ];

        const localOptions: IDropdownOption[] =
            [
                { value: "None", text: "No local rules" },
                { value: "Redmond West", text: "Redmond West" },
                { value: "Redmond North", text: "Redmond North" }
            ];

        const fedRulesVisibility: CSSProperties = { visibility: 'visible' }
        const localRulesVisibility: CSSProperties = { visibility: 'visible' };
        const debugVisibility: CSSProperties = { visibility: 'visible' };
        const controlGroupPadding: CSSProperties = { paddingTop: '1rem' }

        return (
            <div>
                <p style={{ textAlign: "left" }}>
                    <b>Instructions:</b>
                    &nbsp; Choose the number of questions you want, then click "Generate Quiz".&nbsp; Good Luck!
                </p>
                <table className="LayoutTable">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "0.25in" }}>
                                    <Dropdown id="idCount" client={this} label="Number of questions:" options={countOptions} default="3" />

                                    <div style={controlGroupPadding}>Choose division levels (check all that apply)
                                        <div style={{ marginLeft: "0.25in" }}>
                                            <table className="OptionsTable">
                                                <tbody>
                                                    <tr>
                                                        <td><Checkbox id="idMinors" label="Little League Minors" client={this} defaultValue="1"/></td>
                                                        <td colSpan={2}><Checkbox id="idMajors" label="Little League Majors" client={this} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Checkbox id="idIntermediates" label="Intermediates (BB Only)" client={this} /></td>
                                                        <td><Checkbox id="idJuniors" label="Juniors" client={this} /></td>
                                                        <td><Checkbox id="idSeniors" label="Seniors" client={this} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div style={controlGroupPadding}>Choose sport/associations (check all that apply)
                                        <div style={{ marginLeft: "0.25in" }}>
                                            <table className="OptionsTable">
                                                <tbody>
                                                    <tr>
                                                        <td><Checkbox id="idBaseball" label="Baseball" client={this} /></td>
                                                        <td><Checkbox id="idSoftball" label="Softball" client={this} /></td>
                                                    </tr>
                                                    <tr style={fedRulesVisibility}>
                                                        <td colSpan={2}><Checkbox id="idFed" label="NFHS (Fed/High school)" client={this} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div style={controlGroupPadding}>Choose season type (check all that apply)
                                        <div style={{ marginLeft: "0.25in" }}>
                                            <table className="OptionsTable">
                                                <tbody>
                                                    <tr>
                                                        <td><Checkbox id="idRegular" label="Regular season" client={this} /></td>
                                                        <td><Checkbox id="idTournament" label="Tournament" client={this} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div style={controlGroupPadding}>Difficulty (choose one more more levels of difficulty)
                                        <div style={{ marginLeft: "0.25in" }}>
                                            <table className="OptionsTable">
                                                <tbody>
                                                    <tr>
                                                        <td><Checkbox id="idDiff1" label='Umpire "101" (The absolute basics)' client={this} /></td>
                                                        <td><Checkbox id="idDiff2" label="Rookie (for deeper coverage of the basics)" client={this} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Checkbox id="idDiff3" label="Senior (more complicated situtations)" client={this} /></td>
                                                        <td><Checkbox id="idDiff4" label="Veteran (difficult interpretations/situations)" client={this} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <p style={localRulesVisibility}>
                                        <Dropdown id="idLocal" client={this} label="Include local league questions for:" options={localOptions} default="None" />
                                    </p>
                                    <p style={debugVisibility}>
                                        <Textbox id="idQDebug" client={this} label="Q-Debug-List" />
                                    </p>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <button onClick={this.generateQuizClick.bind(this)}>Generate Quiz</button>
                                </div>
                            </td>
                            <td style={{ verticalAlign: "top" }}>
                                <Legend />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }
}
