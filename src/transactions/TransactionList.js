import {Datagrid, DateField, List, NumberField} from "react-admin";
import React from "react";

export const TransactionList = props => {
    const label = props.options.label;
    return (
        <List {...props} title={"Lista Transazioni " + label}>
            <Datagrid rowClick={"show"}>
                {label.toLowerCase().includes("castro") ? <NumberField source={"masterCard"}/> : console.log("CODDIO")}
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