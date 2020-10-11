import {DateInput, FileInput, NumberInput, SimpleForm} from "react-admin";
import React from "react";

export const TransactionForm = props => {
    const id = props.options.id;
    switch(id){
        case "castro" :
            return (
                <SimpleForm {...props}>
                    <FileInput source={"receipt"}/>
                    <NumberInput source={"masterCard"}/>
                    <NumberInput source={"maestro"}/>
                    <NumberInput source={"visa"}/>
                    <NumberInput source={"amex"}/>
                    <NumberInput source={"diners"}/>
                    <NumberInput source={"pagobancomat"}/>
                    <NumberInput source={"unisona"}/>
                    <NumberInput source={"selfBancomat"}/>
                    <NumberInput source={"eniMobilePayments"}/>
                    <NumberInput source={"eniBce"}/>
                    <NumberInput source={"multicardRoutex"}/>
                    <NumberInput source={"cartaDiCreditoGenerica"}/>
                    <NumberInput source={"elettroBlu"}/>
                    <NumberInput source={"dkv"}/>
                    <DateInput source={"date"}/>
                </SimpleForm>
            )
        case "patrica" :
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
                    <NumberInput source={"eniMobilePayments"}/>
                    <NumberInput source={"eniBce"}/>
                    <NumberInput source={"multicardRoutex"}/>
                    <NumberInput source={"cartaDiCreditoGenerica"}/>
                    <NumberInput source={"elettroBlu"}/>
                    <NumberInput source={"uta"} />
                    <NumberInput source={"dkv"}/>
                    <DateInput source={"date"}/>
                    <FileInput source={"receipt"}/>
                </SimpleForm>
            )
        case "sonnino" :
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
                    <NumberInput source={"eniMobilePayments"}/>
                    <NumberInput source={"eniBce"}/>
                    <NumberInput source={"multicardRoutex"}/>
                    <NumberInput source={"cartaDiCreditoGenerica"}/>
                    <NumberInput source={"elettroBlu"}/>
                    <NumberInput source={"uta"} />
                    <DateInput source={"date"}/>
                    <FileInput source={"receipt"}/>
                </SimpleForm>
            )
        case "prossedi" :
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
}