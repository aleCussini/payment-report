import {Datagrid, DateField, List, NumberField, TextField} from "react-admin";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import db from '../../firebase/firebase-db'
import { red } from "@material-ui/core/colors";

export const SummariesPOSList = props => {
    const label = props.options.label;
    return (
        <List {...props} title={"Lista Aggregati"}>
            <Datagrid rowClick={"show"}>
                <DateField source={"date"}/>
                <NumberField source={props.options.label}/>
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

const ColoredNumberField = props => {
    const classes = useStyles();
    let summaryValue = 0;
    let difference = 0;
    let done = false;
    let reportValue = 0;
    let summaryRef = db.ref('summariesPOS').child(props.record.date).child(props.source)
    let reportRef = db.ref('reportPOS').child(props.record.date).child(props.source)
    summaryRef.once('value', summarySnap => {
        reportRef.ref.once('value', reportSnap => {
            summaryValue = summarySnap.val() == null ? 0 :  summarySnap.val()
            reportValue = reportSnap.val() == null ? 0 : reportSnap.val()
            difference = reportValue - summaryValue;
            console.log('summaryVal: ', summaryValue)
            console.log('reportVal:', reportValue)
            console.log('difference', difference);
            props.source = summaryValue + '(' + difference + ')';
            done = true;

        })
    });

    return (
        <TextField
            className={classnames({
                [classes.big]: summaryValue !== reportValue,
                [classes.small]: summaryValue === reportValue,
            })}
            {...props}
        />
    );
    
};