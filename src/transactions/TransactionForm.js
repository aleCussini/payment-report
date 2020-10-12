import {CastroForm} from "./castro/CastroForm";
import {PatricaForm} from "./patrica/PatricaForm";
import React from "react";
import { SonninoForm } from "./sonnino/SonninoForm";
import { ProssediForm } from "./prossedi/ProssediForm";
export const TransactionForm = props => {
    const id = props.options.id;
    switch(id){
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
    }    
}