import firebaseDataProvider from "ra-data-firebase-client";
import db from "./firebase/firebase-db";
import * as firebase from './firebase/firebase'
import {FirebaseAuthProvider} from 'react-admin-firebase';
import storage from './firebase/firebase-storage';

const dataProvider = firebaseDataProvider(firebase, {})
export const authProvider = FirebaseAuthProvider(firebase, {})

export const customDataProvider = {

    ...dataProvider,

    create: async (resource, params) => {
        if (resource === 'summariesPOS' || resource === 'reportPOS') {
            // fallback to the default implementation
            return dataProvider.create(resource, params);
        }
        console.log('params: ', params)
        let receiptImage = params.data.receipt
        if (receiptImage){
            let receiptUrl = await updateReceipt(params.data.receipt, resource, params.data.date)
            updateSummary(params)
            return dataProvider.create(resource, {
                ...params,
                data: {
                    ...params.data,
                    receipt: {url: receiptUrl},
                },
            })
        }
    },

    update: async (resource, params) => {
        if (resource === 'summariesPOS' || resource === 'reportPOS') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
        console.log('params: ', params)
        let receiptImage = params.data.receipt
        //updateSummary(params) in update meglio creare una funzione di refresh, piuttosto che aggiornare direttamente il record
        if(receiptImage){
            let receiptUrl = await updateReceipt(params.data.receipt, resource, params.data.date)
            return dataProvider.update(resource, {
                ...params,
                data: {
                    ...params.data,
                    receipt: {url: receiptUrl},
                },
            })
        } else {
            return dataProvider.update(resource, params);    
        }
    }
}

function updateSummary(params){
    let summaryRef = db.ref('summariesPOS/' + params.data.date)
    console.log('summaryRef', summaryRef)
    summaryRef.once('value', snapshot => {
        console.log(snapshot)
        let childToUpdate = snapshot.val()
        console.log('childToUpdate',childToUpdate)
        if(childToUpdate == null){
            summaryRef.set({
                id : params.data.date,
                date: params.data.date,
                amex: params.data.amex==null?  0 : convertToInt(params.data.amex),
                visa: params.data.visa==null?  0 : convertToInt(params.data.visa),
                maestro: params.data.maestro==null?  0 : convertToInt(params.data.maestro),
                masterCard: params.data.masterCard==null?  0 : convertToInt(params.data.masterCard),
                pagobancomat: params.data.pagobancomat==null?  0 : convertToInt(params.data.pagobancomat)
            })
        } else {
            summaryRef.update({
                amex: childToUpdate.amex == null ? convertToInt(params.data.amex) : (convertToInt(childToUpdate.amex) + convertToInt(params.data.amex)),
                visa: childToUpdate.visa == null ? convertToInt(params.data.visa) : (convertToInt(childToUpdate.visa) + convertToInt(params.data.visa)),
                maestro: childToUpdate.maestro == null ?  convertToInt(params.data.maestro) : (convertToInt(childToUpdate.maestro) + convertToInt(params.data.maestro)),
                masterCard: childToUpdate.masterCard == null ? convertToInt(params.data.masterCard) :  (convertToInt(childToUpdate.masterCard) + convertToInt(params.data.masterCard)),
                pagobancomat: childToUpdate.pagobancomat == null ? convertToInt(params.data.pagobancomat) : (convertToInt(childToUpdate.pagobancomat) + convertToInt(params.data.pagobancomat))
            })
        }
    })
}

function convertToInt(number){
    return number==null? 0 : parseFloat(number)
}

async function updateReceipt(image, resource, objId) {
    const previewImage = image.rawFile
    let storageRef = storage.ref('receipts/' +resource + '/' + objId)
    await storageRef.put(previewImage).then(a => console.log("preview element updated", a));
    return storageRef.getDownloadURL();
}
