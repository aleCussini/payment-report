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
                <FunctionField label="+/-"  render = {async function render() {return  await difference(this.record, 'masterCard')}}/>
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
    let reportValue = 0;
    let summaryRef = db.ref('summariesPOS').child(record.date).child(payment)
    let reportRef = db.ref('reportPOS').child(record.date).child(payment)
    let difference =   getDifference (summaryRef, reportRef); 
    console.log('difference to return: ', difference)
    let id = record.date + '' + payment
    console.log(id)
    return (
        <p id = {id}>{difference}</p>
    )
    
};

function convertToNumber(number){
    return number==null? 0 : parseFloat(number)
}

 function getDifference(summaryRef, reportRef){
    summaryRef.once('value', summarySnap => {
        reportRef.ref.once('value', reportSnap => {
            return difference = convertToNumber(reportSnap.val()) - convertToNumber(summarySnap.val());
        }) 
    });
}

function test(){
    return (
        <p >difference</p>
    )
}