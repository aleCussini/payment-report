import {Datagrid, DateField, List, NumberField, TextField, FunctionField} from "react-admin";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import db from '../../firebase/firebase-db'
import { red } from "@material-ui/core/colors";

export const SummariesPOSList = props => {
    const label = props.options.label;
    console.log('######## load 1 #############')
    return (
        <List {...props} title={"Lista Aggregati"}>
            <Datagrid rowClick={"show"}>
                <DateField source={"date"}/>
                <NumberField source={"masterCard"}/>
                <FunctionField label="+/-" render = {record => test_difference(record, 'masterCard')} />
                <NumberField source={"maestro"}/>
                <NumberField source={"visa"}/>
                <NumberField source={"amex"}/>
                <NumberField source={"pagobancomat"}/>
            </Datagrid>
        </List>
    )
};


const useStyles = makeStyles({
    small: { color: 'green' },
    big: { color: 'red' },
});

 async function difference(record, payment){
    console.log('record', record)
    console.log('payment', payment)
    let summaryValue = 0;
    let difference = 0;
    let reportValue = 0;
    let summaryRef = db.ref('summariesPOS').child(record.date).child(payment)
    let reportRef = db.ref('reportPOS').child(record.date).child(payment)
    difference = await getDifference (summaryRef, reportRef); 
    console.log('difference to return: ', difference)
    return (
        <p>{difference}</p>
    );
};

function convertToNumber(number){
    return number==null? 0 : parseFloat(number)
}

async function getDifference(summaryRef, reportRef){
    summaryRef.once('value', summarySnap => {
        reportRef.ref.once('value', reportSnap => {
            difference = convertToNumber(reportSnap.val()) - convertToNumber(summarySnap.val());
        }) 
    });
}

function test_difference(){
    return (
        <p>gnagna</p>
    )
}