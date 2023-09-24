import React from 'react';

export interface ComponentProps
{
}

export interface ComponentState
{
}

export class Component extends React.Component<ComponentProps, ComponentState>
{
    constructor(props: ComponentProps)
    {
        super(props);
    }

    render()
    {
        return (
            <div>Hello world!</div>
        );
    }
}
