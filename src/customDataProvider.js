import firebaseDataProvider from "ra-data-firebase-client";
import db from "./firebase/firebase-db";
import * as firebase from './firebase/firebase'
import {FirebaseAuthProvider} from 'react-admin-firebase';

const dataProvider = firebaseDataProvider(firebase, {})
export const authProvider = FirebaseAuthProvider(firebase, {})

export const customDataProvider = {

    ...dataProvider,

    create: (resource, params) => {
        if (resource === 'summaries' || resource === 'report') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        console.log('params: ', params)
        updateSummary(params)
        return dataProvider.create(resource, params);
    },

    update: (resource, params) => {
        if (resource === 'summaries' || resource === 'report') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
        console.log('params: ', params)
        updateSummary(params)
        return dataProvider.update(resource, params);    
    }
}

function updateSummary(params){
    let summaryRef = db.ref('summaries/' + params.data.date)
    console.log('summaryRef', summaryRef)
    summaryRef.once('value', snapshot => {
        console.log(snapshot)
        let childToUpdate = snapshot.val()
        console.log('childToUpdate',childToUpdate)
        if(childToUpdate == null){
            summaryRef.set({
                date: params.data.date,
                amex: params.data.amex==null?  0 : convertToInt(params.data.amex),
                visa: params.data.visa==null?  0 : convertToInt(params.data.visa),
                eniBce: params.data.eniBce==null?  0 : convertToInt(params.data.eniBce),
                masterCard: params.data.masterCard==null?  0 : convertToInt(params.data.masterCard),
                pagobancomat: params.data.pagobancomat==null?  0 : convertToInt(params.data.pagobancomat)
            })
        } else {
            summaryRef.update({
                amex: childToUpdate.amex == null ? convertToInt(params.data.amex) : (convertToInt(childToUpdate.amex) + convertToInt(params.data.amex)),
                visa: childToUpdate.visa == null ?  convertToInt(params.data.visa) : (convertToInt(childToUpdate.visa) + convertToInt(params.data.visa)),
                eniBce: childToUpdate.eniBce == null ?  convertToInt(params.data.eniBce) : (convertToInt(childToUpdate.eniBce) + convertToInt(params.data.eniBce)),
                masterCard: childToUpdate.masterCard == null ? convertToInt(params.data.masterCard) :  (convertToInt(childToUpdate.masterCard) + convertToInt(params.data.masterCard)),
                pagobancomat: childToUpdate.pagobancomat == null ? convertToInt(params.data.pagobancomat) : (convertToInt(childToUpdate.pagobancomat) + convertToInt(params.data.pagobancomat))
            })
        }
    })
}

function convertToInt(number){
    return number==null? 0 : parseInt(number)
}
