import React from 'react';
import bb_art from '../Assets/baseball.png';
import title from '../Assets/title.gif';

export interface AppHeaderProps
{
}

export interface AppHeaderState
{
}

export class AppHeader extends React.Component<AppHeaderProps, AppHeaderState>
{
    render()
    {
        return (
            <div className="AppHeader">
                <table className="LayoutTable" style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <img src={bb_art} alt="" />
                            </td>
                            <td style={{ width: "100%" }}>
                                <p className="NoSpacing" style={{ textAlign: "center" }}>
                                    <img src={title} alt="Online Umpire Quiz" />
                                </p>
                                <p className="NoSpacing" style={{ textAlign: "center" }}>
                                    Questions based on NFHS, OBR, and LIttle League rules.
                                </p>
                            </td>
                            <td >
                                <img src={bb_art} alt="" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        );
    }
}