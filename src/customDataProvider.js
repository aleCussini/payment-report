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
            updateSummary(params, params.data)
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
        updateSummary(params)
        if(receiptImage.rawFile){
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
    },

    delete: async (resource, params) => {
        if (resource === 'summariesPOS' || resource === 'reportPOS') {
            // fallback to the default implementation
            return dataProvider.delete(resource, params);
        }
        console.log('params',params);
        updateSummaryDelete(params)
        return dataProvider.delete(resource,params)
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
                amex: params.data.amex==null?  0 : convertToNumber(params.data.amex),
                visa: params.data.visa==null?  0 : convertToNumber(params.data.visa),
                maestro: params.data.maestro==null?  0 : convertToNumber(params.data.maestro),
                masterCard: params.data.masterCard==null?  0 : convertToNumber(params.data.masterCard),
                pagobancomat: params.data.pagobancomat==null?  0 : convertToNumber(params.data.pagobancomat)
            })
        } else {
            // altrimenti incremento il record summary con la somma algebrica tra il valore esistente e quello aggiornato
            summaryRef.update({
                amex : (params.previousData) ? convertToNumber(childToUpdate.amex) + (convertToNumber(params.data.amex) - convertToNumber(params.previousData.amex)) : convertToNumber(childToUpdate.amex) + convertToNumber(params.data.amex),
                visa :  (params.previousData) ? convertToNumber(childToUpdate.visa) + (convertToNumber(params.data.visa) - convertToNumber(params.previousData.visa)) : convertToNumber(childToUpdate.visa) + convertToNumber(params.data.visa),
                maestro :  (params.previousData) ? convertToNumber(childToUpdate.maestro) + (convertToNumber(params.data.maestro) - convertToNumber(params.previousData.maestro)) :  convertToNumber(childToUpdate.maestro) + convertToNumber(params.data.maestro),
                masterCard :  (params.previousData) ? convertToNumber(childToUpdate.masterCard) + (convertToNumber(params.data.masterCard) - convertToNumber(params.previousData.masterCard)) : convertToNumber(childToUpdate.masterCard) + convertToNumber(params.data.masterCard),
                pagobancomat :  (params.previousData) ? convertToNumber(childToUpdate.pagobancomat) + (convertToNumber(params.data.pagobancomat) - convertToNumber(params.previousData.pagobancomat)) : convertToNumber(childToUpdate.pagobancomat) + convertToNumber(params.data.pagobancomat)
            })
        }
    })
}

function convertToNumber(number){
    return number==null? 0 : parseFloat(number)
}

function updateSummaryDelete(params){
    let summaryRef = db.ref('summariesPOS/' + params.previousData.date)
    console.log('summaryRef', summaryRef)
    summaryRef.once('value', snapshot => {
        console.log(snapshot)
        let childToUpdate = snapshot.val()
        console.log('childToUpdate',childToUpdate)
        // altrimenti incremento il record summary con la somma algebrica tra il valore esistente e quello aggiornato
        summaryRef.update({
            amex : convertToNumber(childToUpdate.amex) - convertToNumber(params.previousData.amex),
            visa :  convertToNumber(childToUpdate.visa) - convertToNumber(params.previousData.visa),
            maestro :  convertToNumber(childToUpdate.maestro) - convertToNumber(params.previousData.maestro),
            masterCard :  convertToNumber(childToUpdate.masterCard) - convertToNumber(params.previousData.masterCard),
            pagobancomat :  convertToNumber(childToUpdate.pagobancomat) - convertToNumber(params.previousData.pagobancomat)
        })

    })
}

async function updateReceipt(image, resource, objId) {
    const previewImage = image.rawFile
    let storageRef = storage.ref('receipts/' +resource + '/' + objId)
    await storageRef.put(previewImage).then(a => console.log("preview element updated", a));
    return storageRef.getDownloadURL();
}
