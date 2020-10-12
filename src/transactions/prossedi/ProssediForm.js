import {DateInput, FileInput, NumberInput, SimpleForm} from "react-admin";
import React from "react";

export const ProssediForm = props => {
    return (
        <SimpleForm {...props}>
            <NumberInput source={"amex"}/>
            <NumberInput source={"masterCard"}/>
            <NumberInput source={"maestro"}/>
            <NumberInput source={"visa"}/>
            <NumberInput source={"diners"}/>
            <NumberInput source={"pagobancomat"}/>
            <NumberInput source={"unionPay"}/>
            <NumberInput source={"selfBancomat"}/>
            <NumberInput source={"elettroBlu"}/>
            <NumberInput source={"carteQ8"} />
            <NumberInput source={"carteQ8Self"} />
            <DateInput source={"date"}/>
            <FileInput source={"receipt"}/>
        </SimpleForm>
    )    
}