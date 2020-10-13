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
        newChild.id = date
        db.ref('summaries').child(date).update(newChild).then(r => console.log('r', r))
    })

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