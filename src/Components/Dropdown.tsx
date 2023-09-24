import React from 'react';
import { IBaseFormControlProps } from './IBaseFormControlProps';

export interface IDropdownOption
{
    value: string;
    text: string;
}

export interface DropdownProps extends IBaseFormControlProps
{
    options: IDropdownOption[];
    default: string;
}

export interface DropdownState
{
}

export class Dropdown extends React.Component<DropdownProps, DropdownState>
{
    onChange(e: React.ChangeEvent<HTMLSelectElement>)
    {
        this.props.client.setFormControlValue(this.props.id, e.target.value);
    }

    render()
    {
        const options = this.props.options.map(
            (_value) => (<option value={_value.value} key={_value.value}>{_value.text}</option>));

        if (this.props.client.getFormControlValue(this.props.id) === undefined)
            this.props.client.setFormControlValue(this.props.id, this.props.options[0].value);

        const initialValue = this.props.client.getFormControlValue(this.props.id);
        const defaultValue = initialValue ?? this.props.options[0].value;

        const label =
            this.props.label != null ? (<>{this.props.label} &nbsp;&nbsp;</>) : "";

        if (this.props.label)
            return (
                <>
                    {label}
                    <select id={this.props.id} onChange={this.onChange.bind(this)} defaultValue={defaultValue}>
                        {options}
                    </select>
                </>
            );
    }
}
