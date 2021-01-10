import {Datagrid, DateField, List, NumberField} from "react-admin";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import db from '../../firebase/firebase-db'

export const SummariesPOSList = props => {
    const label = props.options.label;
    return (
        <List {...props} title={"Lista Aggregati"}>
            <Datagrid rowClick={"show"}>
                <DateField source={"date"}/>
                <ColoredNumberField source={"masterCard"}/>
                <ColoredNumberField source={"maestro"}/>
                <NumberField source={"visa"}/>
                <NumberField source={"amex"}/>
                <NumberField source={"pagobancomat"}/>
            </Datagrid>
        </List>
    )
};


const useStyles = makeStyles({
    small: { color: 'black' },
    big: { color: 'red' },
});

const ColoredNumberField = props => {
    const classes = useStyles();
    let summaryValue = 0;
    let reportValue = 0;
    let summaryRef = db.ref('summariesPOS').child(props.record.date).child(props.source)
    let reportRef = db.ref('reportPOS').child(props.record.date).child(props.source)
    summaryRef.once('value', summarySnap => {
        reportRef.ref.once('value', reportSnap => {
            summaryValue = summarySnap.val()
            reportValue = reportSnap.val()
            console.log('summaryVal: ', summaryValue)
            console.log('reportVal', reportValue)
        })
    });
    return (
        <NumberField
            className={classnames({
                [classes.small]: parseFloat(summaryValue) == parseFloat(reportValue),
                [classes.big]: parseFloat(summaryValue) != parseFloat(reportValue),
            })}
            {...props}
        />
    );
};