import {DateField, NumberField, Show, SimpleShowLayout} from "react-admin";
import React from "react";

export const TransactionShow = props => {
    return (
        <Show title={<TransactionTitle props={props}/>} {...props}>
            <SimpleShowLayout>
                <NumberField source={"masterCard"}/>
                <NumberField source={"maestro"}/>
                <NumberField source={"visa"}/>
                <NumberField source={"amex"}/>
                <NumberField source={"diners"}/>
                <NumberField source={"pagobancomat"}/>
                <NumberField source={"unisona"}/>
                <NumberField source={"selfBancomat"}/>
                <NumberField source={"eniMobilePayments"}/>
                <NumberField source={"eniBce"}/>
                <NumberField source={"multicardRoutex"}/>
                <NumberField source={"cartaDiCreditoGenerica"}/>
                <NumberField source={"elettroBlu"}/>
                <NumberField source={"dkv"}/>
                <NumberField source={"selfBancomat"}/>
                <DateField source={"date"}/>
            </SimpleShowLayout>
        </Show>
    )
}

const TransactionTitle = ({props, record}) => {
    return <span>{props.options.label + " " + record.date}</span>;
};