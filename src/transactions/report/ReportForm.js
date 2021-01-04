import {SimpleForm} from "react-admin";
import React from "react";
import CSVReader from 'react-csv-reader'
import db from "../../firebase/firebase-db"
import { array } from "prop-types";

const   AMEX = 'AMEX', EDCM = 'EDC', 
        VISACR = 'VISACR', MASTER = 'MASTER', 
        KUWAIT = 'KUWAIT', PAGOBANCOMAT = 'INCASSO POS DEL',
        ENI = 'ENI SPA', ELETTROBLU = 'elettroblu'
const paymentType1 = {AMEX, EDCM, VISACR, MASTER}


export const ReportForm = props => {
    return (
        <SimpleForm {...props}>
            <CSVReader 
                onFileLoaded={(data, fileInfo) => readReport(data) /*console.dir(data, fileInfo)*/} 
                label='Caricare il tracciato in formato CSV (In excel salvare il foglio attivo con estensione CSV, valori separati da virgola)'/>
        </SimpleForm>
    )

    function readReport(data){
        data.map((record, index) => {
            let toSave=false
            let obj = {}
            let description = record[2]
            let amount = record[3]
            if(description.includes(AMEX) || description.includes(EDCM) || description.includes(VISACR) || description.includes(MASTER)){              
                obj = getRecordInfo(description)
                toSave=true
                console.log('[' + obj.paymentType +'] date: ', obj.date,' amount: ', amount)
            }
            /*else if (description.includes(KUWAIT)){
                obj = getKuwaitInfo(description)
                console.log('[' + obj.paymentType +'] date: ', obj.date,' amount: ', amount)
            }*/
            else if (description.includes(PAGOBANCOMAT)){
                obj = getPagobancomatInfo(description)
                toSave=true
                console.log('[' + obj.paymentType +'] date: ', obj.date,' amount: ', amount)
            }
            else if (description.includes(ENI)){
                obj = getEniInfo(description)
                toSave=true
                console.log('[' + obj.paymentType +'] date: ', obj.date,' amount: ', amount)
            }
            /*else if (description.includes(ELETTROBLU)){
                obj = getElettrobluInfo(description)
            }*/
            
            if(toSave){
                let reportRef = db.ref('/report/'+obj.date+'/'+obj.paymentType)            
                let paymentType= obj.paymentType
                reportRef.set({
                    amount: amount
                });
                console.log('updated for date: ', obj.date, ' and payment type: ', obj.paymentType, ' amount: ', amount)
            }
        })
    }

    function getRecordInfo(descriptionToSub){
        // es INCASSO POS 29/08/19 AMEX    CONV. 3898566 / 00001
        let info = descriptionToSub.substring(12,29).trim();
        let infoArray = info.split(' ');
        let dateToFormat = infoArray[0];
        let paymentType = infoArray[1].replaceAll('.','');
        let arrayDate = dateToFormat.split('/')
        let date = '20' + arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0]
        let obj = {
            date : date,
            paymentType : paymentType
        }
        return obj;
    }

    function getKuwaitInfo(descriptionToSub){
        let dateToFormat = descriptionToSub.substring(descriptionToSub.length-7)
        let arrayDate = dateToFormat.split('.')
        let month = arrayDate[1] <10 ? '0' + arrayDate[1] :  arrayDate[1]
        let date = '20' + arrayDate[2]+'-' + month + '-' + arrayDate[0]
        let obj = {
            date : date,
            paymentType : KUWAIT
        }
        return obj;
    }

    function getPagobancomatInfo(descriptionToSub){
        let dateToFormat = descriptionToSub.substring(16,24)
        let arrayDate = dateToFormat.split('/')
        let month = arrayDate[1]
        let date = '20' + arrayDate[2]+'-' + month + '-' + arrayDate[0]
        let obj = {
            date : date,
            paymentType : 'PAGOBANCOMAT'
        }
        return obj;
    }

    function getEniInfo(descriptionToSub){
        let dateToFormat = descriptionToSub.substring(110,118)
        let day = dateToFormat.substring(0,2)
        let month = dateToFormat.substring(2,4)
        let year = dateToFormat.substring(4,8)
        let date = year + '-' + month + '-' + day
        let obj = {
            date : date,
            paymentType : 'ENI'
        }
        return obj;
    }
    function getElettrobluInfo(descriptionToSub){
        
    }

}