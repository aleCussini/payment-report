import {Datagrid, DateField, List, NumberField, TextField, FunctionField} from "react-admin";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import db from '../../firebase/firebase-db'
import { red } from "@material-ui/core/colors";

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
         return (
            <List {...this.props} title={"Lista Aggregati"}>
                <Datagrid rowClick={"show"}>
                    <DateField source={"date"}/>
                    <NumberField source={"masterCard"}/>
                    <FunctionField label="+/-"  render = {record => getFromState(record, this.state.reportObj, 'masterCard')}/>
                    <NumberField source={"maestro"}/>
                    <FunctionField label="+/-"  render = {record => getFromState(record, this.state.reportObj, 'maestro')}/>
                    <NumberField source={"visa"}/>
                    <FunctionField label="+/-"  render = {record => getFromState(record, this.state.reportObj, 'visa')}/>
                    <NumberField source={"amex"}/>
                    <FunctionField label="+/-"  render = {record => getFromState(record, this.state.reportObj, 'amex')}/>
                    <NumberField source={"pagobancomat"}/>
                    <FunctionField label="+/-"  render = {record => getFromState(record, this.state.reportObj, 'pagobancomat')}/>
                </Datagrid>
            </List>
        )
    }
    
}


function convertToNumber(number){
    return number==null? 0 : parseFloat(number)
}


function getFromState(record ,reportObj, payment){
    let difference = 0;
    let summaryVal = convertToNumber(record[payment]);
    let reportVal =  reportObj[record.date] ? convertToNumber(reportObj[record.date][payment])   : 0
    console.log('source', summaryVal)
    console.log('value from report',reportVal);
    difference = reportVal - summaryVal
    console.log('difference', difference)
    return (
        <p >{difference}</p>
    )
}

export default SummariesPOSList;