import {Datagrid, DateField, List, NumberField} from "react-admin";
import React from "react";

export const TransactionList = props => {
    const label = props.options.label;
    return (
        <List {...props} title={"Lista Transazioni " + label}>
            <Datagrid rowClick={"show"}>
                <DateField source={"date"}/>
                <NumberField source={"masterCard"}/>
                <NumberField source={"maestro"}/>
                <NumberField source={"visa"}/>
                <NumberField source={"amex"}/>
                <NumberField source={"pagobancomat"}/>
            </Datagrid>
        </List>
    )
};