import {ImageField, FileInput, NumberInput, DateInput, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const TransactionForm = props => {
    return (
        <SimpleForm {...props}>
            <FileInput      source={"file"}/>
            <NumberInput    source={"masterCard"}/>
            <NumberInput    source={"maestro"}/>
            <NumberInput    source={"visa"}/>
            <NumberInput    source={"amex"}/>
            <NumberInput    source={"diners"}/>
            <NumberInput    source={"pagobancomat"}/>
            <NumberInput    source={"unisona"}/>
            <NumberInput    source={"selfBancomat"}/>
            <NumberInput    source={"eniMobilePayments"}/>
            <NumberInput    source={"eniBce"}/>
            <NumberInput    source={"multicardRoutex"}/>
            <NumberInput    source={"cartaDiCreditoGenerica"}/>
            <NumberInput    source={"elettroBlu"}/>
            <NumberInput    source={"dkv"}/>
            <NumberInput    source={"selfBancomat"}/>
            <DateInput      source={"date"} />
        </SimpleForm>
    )
}