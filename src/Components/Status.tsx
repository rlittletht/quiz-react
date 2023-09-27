import React from 'react';

export interface StatusProps
{
    status: string[];
}

export interface StatusState
{
    status: string[];
}

export class Status extends React.Component<StatusProps, StatusState>
{
    constructor(props: StatusProps)
    {
        super(props);

        this.state = { status: [] };
    }

    setStatus(lines: string[])
    {
        this.setState({ status: [...lines] });
    }

    render()
    {
        const status = this.props.status.map(
            (_value) =>
            (
                <>{_value}<br />
                </>
            ));

        return (
            <div>{status}</div>
        );
    }
}
