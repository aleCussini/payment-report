import {Datagrid, DateField, List, NumberField} from "react-admin";
import React from "react";

export const TransactionList = props => {
    return (
        <List {...props} title={"Lista Transazioni " + props.options.label}>
            <Datagrid rowClick={"show"}>
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
            </Datagrid>
        </List>
    )
};