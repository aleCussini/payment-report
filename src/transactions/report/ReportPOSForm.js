import {SimpleForm, NumberInput, DateInput} from "react-admin";
import React from "react";
import CSVReader from 'react-csv-reader'
import db from "../../firebase/firebase-db"
import { array } from "prop-types";


export const ReportPOSForm = props => {
    return (
        <SimpleForm {...props}>
            <DateInput source={"date"}/>
            <NumberInput source={"masterCard"} id='masterCard'/>
            <NumberInput source={"maestro"}/>
            <NumberInput source={"visa"}/>
            <NumberInput source={"amex"}/>
            <NumberInput source={"diners"}/>
            <NumberInput source={"pagobancomat"}/>
        </SimpleForm>
    )

   
}