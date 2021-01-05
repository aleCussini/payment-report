import firebaseDataProvider from "ra-data-firebase-client";
import * as firebase from "./firebase/firebase";
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
    },

    update: (resource, params) => {
        if (resource === 'summaries' || resource === 'report') {
            // fallback to the default implementation
            return dataProvider.update(resource, params);
        }
    }
}