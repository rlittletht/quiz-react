import React from 'react';

export interface LegendProps
{
}

export interface LegendState
{
}

export class Legend extends React.Component<LegendProps, LegendState>
{
    render()
    {
        return (
            <>
                <p style={{ marginLeft: "0.5in" }}>
                    <b>Definitions</b>
                </p>
                <table className="GridTable" style={{ marginLeft: "0.5in" }} cellPadding={2} border={1}>
                    <tbody>
                        <tr>
                            <td>
                                BR
                            </td>
                            <td>
                                Batter/Runner
                            </td>
                        </tr>
                        <tr>
                            <td>
                                R1
                            </td>
                            <td>
                                Runner starting at 1st base
                            </td>
                        </tr>
                        <tr>
                            <td>
                                R2
                            </td>
                            <td>
                                Runner starting at 2nd base
                            </td>
                        </tr>
                        <tr>
                            <td>
                                R3
                            </td>
                            <td>
                                Runner starting at 3rd base
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}
