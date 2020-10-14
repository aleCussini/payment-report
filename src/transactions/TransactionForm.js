import {CastroForm} from "./castro/CastroForm";
import {PatricaForm} from "./patrica/PatricaForm";
import React from "react";
import {SonninoForm} from "./sonnino/SonninoForm";
import {ProssediForm} from "./prossedi/ProssediForm";
import db from "../firebase/firebase-db";

export const TransactionForm = props => {

    const id = props.options.id;

    db.ref(id).on("child_added", a => {
        let newChild = a.val();
        let date = newChild.date;
        console.log("child added ", newChild)
        console.log("child added with date ", date)

        let childRef = db.ref('temp-summaries').child(date);

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
        default:
            return null
    }
}