import * as React from 'react';
import {AppBar} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader'
import db from "./firebase/firebase-db"

const AMEX = 'AMEX', MAESTRO = 'EDC',
    VISACR = 'VISACR', MASTER = 'MASTER',
    KUWAIT = 'KUWAIT', PAGOBANCOMAT = 'INCASSO POS DEL',
    ENI = 'ENI SPA', ELETTROBLU = 'elettroblu'
const paymentType1 = {AMEX, MAESTRO, VISACR, MASTER}

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const CustomAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer}/>
            <CSVReader
                onFileLoaded={(data, fileInfo) => readReportPOS(data) /*console.dir(data, fileInfo)*/}/>
        </AppBar>
    );
};

function readReportPOS(data) {
    let reportObj = new Map()
    data.map((record, index) => {
        let description = record[2]
        let amount = record[3]
        let descObject = readDescription(description);

        if (descObject) {
            let paymentType = descObject.paymentType;
            let date = descObject.date;
            const key = date + '.' + paymentType

            if (reportObj.has(key)) {
                let existingObject = reportObj.get(key)
                let sum = (existingObject[date][paymentType]) + convertToNumber(amount.replaceAll('.',''));
                existingObject = {[date]:{...existingObject[date], [paymentType]: sum}}
                reportObj.delete(key)
                reportObj.set(key, existingObject)
            } else {
                let obj = {
                    [date]: {
                        [paymentType]: convertToNumber(amount.replaceAll('.','')),
                        date: date,
                        id: date
                    }
                }
                reportObj.set(key, obj)
            }
        }

    })

    reportObj.forEach((value,key) => {
        let keyFB = key.split('.')[0]
        let ref = db.ref('/reportPOS-test/')
        ref.set(value)
    })

    alert('Inserimento Completato')
}

function getCommonDate(descriptionToSub) {
    // es INCASSO POS 29/08/19 AMEX    CONV. 3898566 / 00001
    let info = descriptionToSub.substring(12, 29).trim();
    let infoArray = info.split(' ');
    let dateToFormat = infoArray[0];
    let paymentType = infoArray[1].replaceAll('.', '');
    let arrayDate = dateToFormat.split('/')
    let date = '20' + arrayDate[2] + '-' + arrayDate[1] + '-' + arrayDate[0]
    return date;
}

function getPagobancomatDate(descriptionToSub) {
    let dateToFormat = descriptionToSub.substring(16, 24)
    let arrayDate = dateToFormat.split('/')
    let month = arrayDate[1]
    let date = '20' + arrayDate[2] + '-' + month + '-' + arrayDate[0]
    return date;
}

function convertToNumber(number) {

    return number == null ? 0 : parseFloat(number)
}


function readDescription(description) {

    if (description.includes('INCASSO POS')) {

        let date;
        let paymentType;

        if (description.includes(AMEX)) {
            date = getCommonDate(description);
            paymentType = 'amex';
        } else if (description.includes(MAESTRO)) {
            date = getCommonDate(description)
            paymentType = 'maestro'
        } else if (description.includes(VISACR)) {
            date = getCommonDate(description)
            paymentType = 'visa'
        } else if (description.includes(MASTER)) {
            date = getCommonDate(description)
            paymentType = 'masterCard'
        } else if (description.includes(PAGOBANCOMAT)) {
            date = getPagobancomatDate(description)
            paymentType = 'pagobancomat'
        }

        return {
            date: date,
            paymentType: paymentType
        }
    }
}

export default CustomAppBar;