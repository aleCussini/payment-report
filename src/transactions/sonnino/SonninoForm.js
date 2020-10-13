import {DateInput, FileInput, NumberInput, SimpleForm} from "react-admin";
import React from "react";

export const SonninoForm = props => {
    return (
        <SimpleForm {...props}>
            <DateInput source={"date"}/>
            <NumberInput source={"amex"}/>
            <NumberInput source={"masterCard"}/>
            <NumberInput source={"maestro"}/>
            <NumberInput source={"visa"}/>
            <NumberInput source={"diners"}/>
            <NumberInput source={"pagobancomat"}/>
            <NumberInput source={"unionPay"}/>
            <NumberInput source={"selfBancomat"}/>
            <NumberInput source={"eniMobilePayments"}/>
            <NumberInput source={"eniBce"}/>
            <NumberInput source={"multicardRoutex"}/>
            <NumberInput source={"cartaDiCreditoGenerica"}/>
            <NumberInput source={"elettroBlu"}/>
            <NumberInput source={"uta"}/>
            <FileInput source={"receipt"}/>
        </SimpleForm>
    )
}