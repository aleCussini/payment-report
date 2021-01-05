import {SimpleForm, NumberInput, DateInput} from "react-admin";
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
            <DateInput source={"date"}/>
            <NumberInput source={"masterCard"} id='masterCard'/>
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
        </SimpleForm>
    )

    function readReport(data){
        data.map((record, index) => {
            let description = record[2]
            let amount = record[3]
            if(description.includes(AMEX)){
                let ref = db.ref('/report/').child(getCommonDate(description))
                ref.update({ amex:amount, date:  getCommonDate(description)})
            }
            else if(description.includes(EDCM)){              
                let ref = db.ref('/report/').child(getCommonDate(description))
                ref.update ({ edcm: amount , date: getCommonDate(description)})
            }
            else if(description.includes(VISACR)){              
                let ref = db.ref('/report/').child(getCommonDate(description))
                ref.update({ visa: amount, date: getCommonDate(description)})
            }
            else if(description.includes(MASTER)){              
                let ref = db.ref('/report/').child(getCommonDate(description))
                ref.update({ masterCard: amount, date: getCommonDate(description)})
            }
            /*else if (description.includes(KUWAIT)){
                obj = getKuwaitInfo(description)
            }*/
            else if (description.includes(PAGOBANCOMAT)){
                let ref = db.ref('/report/').child(getPagobancomatDate(description))
                ref.update({ pagobancomat : amount, date: getPagobancomatDate(description)})
            }
            else if (description.includes(ENI)){
                let ref = db.ref('/report/').child(getEniDate(description))
                ref.update({eniBce : amount, date: getEniDate(description)})
            }
        })
    }

    function getCommonDate(descriptionToSub){
        // es INCASSO POS 29/08/19 AMEX    CONV. 3898566 / 00001
        let info = descriptionToSub.substring(12,29).trim();
        let infoArray = info.split(' ');
        let dateToFormat = infoArray[0];
        let paymentType = infoArray[1].replaceAll('.','');
        let arrayDate = dateToFormat.split('/')
        let date = '20' + arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0]
        return date;
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

    function getPagobancomatDate(descriptionToSub){
        let dateToFormat = descriptionToSub.substring(16,24)
        let arrayDate = dateToFormat.split('/')
        let month = arrayDate[1]
        let date = '20' + arrayDate[2]+'-' + month + '-' + arrayDate[0]
        return date;
    }

    function getEniDate(descriptionToSub){
        let dateToFormat = descriptionToSub.substring(110,118)
        let day = dateToFormat.substring(0,2)
        let month = dateToFormat.substring(2,4)
        let year = dateToFormat.substring(4,8)
        let date = year + '-' + month + '-' + day
        return date;
    }
    function getElettrobluInfo(descriptionToSub){
        
    }

}