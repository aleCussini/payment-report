import {DateField, ImageField, NumberField, Show, SimpleShowLayout, TextField, SelectField} from "react-admin";
import React from "react";

export const TransactionShow = props => {
    return (
        <Show title={<TransactionTitle/>} {...props}>
            <SimpleShowLayout>
            <NumberField    source={"masterCard"}/>
            <NumberField    source={"maestro"}/>
            <NumberField    source={"visa"}/>
            <NumberField    source={"amex"}/>
            <NumberField    source={"diners"}/>
            <NumberField    source={"pagobancomat"}/>
            <NumberField    source={"unisona"}/>
            <NumberField    source={"selfBancomat"}/>
            <NumberField    source={"eniMobilePayments"}/>
            <NumberField    source={"eniBce"}/>
            <NumberField    source={"multicardRoutex"}/>
            <NumberField    source={"cartaDiCreditoGenerica"}/>
            <NumberField    source={"elettroBlu"}/>
            <NumberField    source={"dkv"}/>
            <NumberField    source={"selfBancomat"}/>
            <DateField      source={"date"} />
            </SimpleShowLayout>
        </Show>
    )
}

const TransactionTitle = ({record}) => {
    return <span>{record.id}</span>;
};