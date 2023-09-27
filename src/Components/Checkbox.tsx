import React from 'react';
import { IBaseFormControlProps } from './IBaseFormControlProps';

export interface CheckboxProps extends IBaseFormControlProps
{
}

export interface CheckboxState
{
}

export class Checkbox extends React.Component<CheckboxProps, CheckboxState>
{
    onChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        const value = e.target.value.toUpperCase() === "ON" ? "1" : "0";

        this.props.client.setFormControlValue(this.props.id, value);
    }

    render()
    {
        const initialValue = this.props.client.getFormControlValue(this.props.id);
        const defaultChecked = (initialValue ?? "0") === "1" ? true : false;

        return (
            <>
                <input type="checkbox" defaultChecked={defaultChecked} name={this.props.id} onChange={this.onChange.bind(this)} />{this.props.label}
            </>
        );
    }
}
