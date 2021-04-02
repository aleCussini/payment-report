import {CastroForm} from "./castro/CastroForm";
import {PatricaForm} from "./patrica/PatricaForm";
import React from "react";
import {SonninoForm} from "./sonnino/SonninoForm";
import {TerracinaForm} from "./terracina/TerracinaForm";
import {ProssediForm} from "./prossedi/ProssediForm";
import {ReportPOSForm} from "./report/ReportPOSForm";
import db from "../firebase/firebase-db";

export const TransactionForm = props => {

    
    
    const id = props.options.id;

    /*

        if(id!='report' && id!= 'summaries'){
            db.ref(id).on("child_added", a => {
                let newChild = a.val();
                let date = newChild.date;
                console.log("child added ", newChild)
                console.log("child added with date ", date)

                let summariesRef = db.ref('summaries/' + date)
                summariesRef.once('value', snapshot => {
                    let childToUpdate = snapshot.val()
                    if(childToUpdate==null){
                        summariesRef.set({date: date,
                            amex: parseInt(newChild.amex),
                            visa: parseInt(newChild.visa),
                            eniBce: parseInt(newChild.eniBce),
                            masterCard: parseInt(newChild.masterCard),
                            pagobancomat: parseInt(newChild.pagobancomat)
                        })
                    }else {
                        console.log(childToUpdate)
                        summariesRef.update({
                            amex: childToUpdate.amex == null ? parseInt(newChild.amex) : (parseInt(childToUpdate.amex) + parseInt(newChild.amex)),
                            visa: childToUpdate.visa == null ?  parseInt(newChild.visa) : (parseInt(childToUpdate.visa) + parseInt(newChild.visa)),
                            eniBce: childToUpdate.eniBce == null ?  parseInt(newChild.eniBce) : (parseInt(childToUpdate.eniBce) + parseInt(newChild.eniBce)),
                            masterCard: childToUpdate.masterCard == null ? parseInt(newChild.masterCard) :  (parseInt(childToUpdate.masterCard) + parseInt(newChild.masterCard)),
                            pagobancomat: childToUpdate.pagobancomat == null ? parseInt(newChild.pagobancomat) : (parseInt(childToUpdate.pagobancomat) + parseInt(newChild.pagobancomat))
                        })
                    }
                })

            /*let childRef = db.ref('temp-summaries').child(date);

            childRef.once("value", snapshot => {
                const oldChild = snapshot.val();
                const newVar = oldChild ? updateChild(oldChild.value, newChild) : newChild;
                db.ref('summaries').child(date).update(newVar).then(value => console.log(value))
                childRef.set({
                    "value": newVar,
                    "prev_value": oldChild ? oldChild.value : null
                }).then(value => {
                    console.log(value)
                })
            }).then(r => console.log(r)) 
        })

        

        function updateChild(oldChild, newChild) {
            let ks = []
            let keys = Object.keys(oldChild);
            keys.forEach(value => {
                if (value !== 'date' && value !== 'id' && value !== 'receipt') {
                    ks.push(value)
                }
            })
            console.log('keys', ks);
            ks.forEach(k => {
                oldChild[k] = oldChild[k] ? oldChild[k] : 0;
                newChild[k] = newChild[k] ? newChild[k] : 0;
                newChild[k] += oldChild[k];
            });
            return newChild;
        }
    }*/

    switch (id) {
        case "castro" :
            return (
                <CastroForm {...props} />
            )
        case "patrica" :
            return (
                <PatricaForm {...props} />
            )
        case "sonnino" :
            return (
                <SonninoForm {...props} />
            )
        case "prossedi" :
            return (
                <ProssediForm {...props} />
            )
        case "terracina" :
             return (
             <TerracinaForm {...props} />
                )
        case "castro-self" :
            return (
                <CastroForm {...props} />
            )
        case "patrica-self" :
            return (
                <PatricaForm {...props} />
            )
        case "sonnino-self" :
            return (
                <SonninoForm {...props} />
            )
        case "prossedi-self" :
            return (
                <ProssediForm {...props} />
            )
        case "terracina-self" :
                return (
                <TerracinaForm {...props} />
                )
        case "reportPOS" :
        return (
            <ReportPOSForm {...props} />
        )
        default:
            return null
    }
}