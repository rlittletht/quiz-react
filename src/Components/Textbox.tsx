import React from 'react';
import { IBaseFormControlProps } from './IBaseFormControlProps';

export interface TextboxProps extends IBaseFormControlProps
{
}

export interface TextboxState
{
}

export class Textbox extends React.Component<TextboxProps, TextboxState>
{
    onChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        this.props.client.setFormControlValue(this.props.id, e.target.value);
    }

    render()
    {
        const initialValue = this.props.client.getFormControlValue(this.props.id);
        const defaultValue = initialValue ?? "";

        return (
            <>
                {this.props.label} <input type="text" id={this.props.id} defaultValue={defaultValue} onChange={this.onChange.bind(this)} />
            </>
        );
    }
}
