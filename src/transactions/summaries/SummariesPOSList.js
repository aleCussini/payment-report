import {Datagrid, DateField, List, NumberField, TextField, FunctionField} from "react-admin";
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import db from '../../firebase/firebase-db'
import { red } from "@material-ui/core/colors";

const useStyles = theme => ({
    masterCard: {
        backgroundColor: '#cbf7d7',
        color: '#405245',
        borderBottom : '1px solid black'
     },
     maestro: {
        backgroundColor: '#f5f3c6',
        color: '#525142',
        borderBottom : '1px solid black'
     },
     visa: {
        backgroundColor: '#f0bdbd',
        color: '#5c4343',
        borderBottom : '1px solid black'
     },
     amex: {
        backgroundColor: '#c5c7fa',
        color: '#494a5c',
        borderBottom : '1px solid black'
     },
     pagobancomat: {
        backgroundColor: '#d7f8fa',
        color: '#3f494a',
        borderBottom : '1px solid black'
     },
});
class SummariesPOSList extends React.Component { 
    constructor(props){
        super(props);
        this.state= {
            reportObj : null
        }
    };
    
    componentDidMount(){
        let reportObj;
        let reportRef = db.ref('reportPOS')
        reportRef.ref.once('value', reportSnap => {
            this.setState({reportObj : reportSnap.val()})
            console.log(this.state.reportObj)
        });
    }
    render(){
        const { classes } = this.props;
         return (
            <List {...this.props} title={"Lista Aggregati"}>
                <Datagrid rowClick={"show"}>
                    <DateField source={"date"}/>
                    <NumberField source={"masterCard"} cellClassName={classes.masterCard}/>
                    <FunctionField label="+/-"  cellClassName={classes.masterCard} render = {record => getFromState(record, this.state.reportObj, 'masterCard')}/>
                    <NumberField source={"maestro"} cellClassName={classes.maestro}/>
                    <FunctionField label="+/-" cellClassName={classes.maestro} render = {record => getFromState(record, this.state.reportObj, 'maestro')}/>
                    <NumberField source={"visa"} cellClassName={classes.visa}/>
                    <FunctionField label="+/-"   cellClassName={classes.visa}  render = {record => getFromState(record, this.state.reportObj, 'visa')}/>
                    <NumberField source={"amex"} cellClassName={classes.amex}/>
                    <FunctionField label="+/-"  cellClassName={classes.amex} render = {record => getFromState(record, this.state.reportObj, 'amex')}/>
                    <NumberField source={"pagobancomat"} cellClassName={classes.pagobancomat}/>
                    <FunctionField label="+/-"   cellClassName={classes.pagobancomat} render = {record => getFromState(record, this.state.reportObj, 'pagobancomat')}/>
                </Datagrid>
            </List>
        )
    }
    
}


function convertToNumber(number){
    return number ?  parseFloat(number).toFixed(2) : 0
}


function getFromState(record ,reportObj, payment){
    if(reportObj){
    let difference = 0;
    let summaryVal = convertToNumber(record[payment]);
    let reportVal =  reportObj[record.date] ? convertToNumber(reportObj[record.date][payment])  : 0
    console.log('source', summaryVal)
    console.log('value from report',reportVal);
    if (reportVal === 0) {
        return (
            <p >non presente</p>
        ) 
    }
    difference = reportVal - summaryVal
    console.log('difference', difference)
        return (
            <p>{convertToNumber(difference)}</p>
        )
    } else return (
        <p >errore</p>
    )
}

export default withStyles(useStyles)(SummariesPOSList);