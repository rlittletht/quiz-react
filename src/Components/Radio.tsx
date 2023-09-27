import React, { CSSProperties } from 'react';
import { IBaseFormControlProps } from './IBaseFormControlProps';

export interface RadioProps extends IBaseFormControlProps
{
    name: string;
    value: string;
}

export interface RadioState
{
}

export class Radio extends React.Component<RadioProps, RadioState>
{
    constructor(props: RadioProps)
    {
        super(props);
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        // this time, use the name since that's the name of the radio group
        this.props.client.setFormControlValue(this.props.name, e.target.value);
    }

    render()
    {
        const curChecked = this.props.client.getFormControlValue(this.props.name) ?? "";
        const checked = curChecked == this.props.value ? true : false;

        return (
            <input type="radio" id={this.props.id} defaultChecked={checked} name={this.props.name} onChange={this.onChange.bind(this)} value={this.props.value} />
            )
    }
}
