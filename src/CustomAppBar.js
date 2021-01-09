import * as React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import CSVReader from 'react-csv-reader'
import db from "./firebase/firebase-db"

const   AMEX = 'AMEX', EDCM = 'EDC', 
        VISACR = 'VISACR', MASTER = 'MASTER', 
        KUWAIT = 'KUWAIT', PAGOBANCOMAT = 'INCASSO POS DEL',
        ENI = 'ENI SPA', ELETTROBLU = 'elettroblu'
const paymentType1 = {AMEX, EDCM, VISACR, MASTER}

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
            <span className={classes.spacer} />
            <CSVReader 
                    onFileLoaded={(data, fileInfo) => readReport(data) /*console.dir(data, fileInfo)*/}/>
        </AppBar>
    );
};

function readReport(data){
    data.map((record, index) => {
        let description = record[2]
        let amount = record[3]
        if(description.includes(AMEX)){
            let commonDate = getCommonDate(description)
            let ref = db.ref('/report/').child(commonDate)
            ref.update({ amex:amount, date: commonDate , id:  commonDate})
        }
        else if(description.includes(EDCM)){       
            let commonDate = getCommonDate(description)
            let ref = db.ref('/report/').child(commonDate)
            ref.update ({ edcm: amount ,date: commonDate, id: commonDate})
        }
        else if(description.includes(VISACR)){         
            let commonDate = getCommonDate(description)     
            let ref = db.ref('/report/').child(commonDate)
            ref.update({ visa: amount,date: commonDate, id: commonDate})
        }
        else if(description.includes(MASTER)){         
            let commonDate = getCommonDate(description)     
            let ref = db.ref('/report/').child(commonDate)
            ref.update({ masterCard: amount, date: commonDate, id: commonDate})
        }
        /*else if (description.includes(KUWAIT)){
            obj = getKuwaitInfo(description)
        }*/
        else if (description.includes(PAGOBANCOMAT)){
            let pagobancomatDate = getPagobancomatDate(description)
            let ref = db.ref('/report/').child(pagobancomatDate)
            ref.update({ pagobancomat : amount, date: pagobancomatDate, id: pagobancomatDate})
        }
        else if (description.includes(ENI)){
            let eniDate = getEniDate(description)
            let ref = db.ref('/report/').child(eniDate)
            ref.update({eniBce : amount, date: eniDate, id: eniDate})
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


export default CustomAppBar;