import React from 'react';
import firebaseDataProvider from 'ra-data-firebase-client'
import './App.css';
import {Admin, Create, Edit, Resource} from "react-admin";
import * as firebase from "firebase";
import {TransactionForm} from "./transactions/TransactionForm";
import {TransactionList} from "./transactions/TransactionList";
import {TransactionShow} from "./transactions/TransactionShow";

firebase.initializeApp({
  apiKey: "AIzaSyCkMv4ZkQhj799LdGR7twelZXakT0yMHU0",
    authDomain: "payment-report-a44a2.firebaseapp.com",
    databaseURL: "https://payment-report-a44a2.firebaseio.com",
    projectId: "payment-report-a44a2",
    storageBucket: "payment-report-a44a2.appspot.com",
    messagingSenderId: "243114162369",
    appId: "1:243114162369:web:6955b899b7c5a018d1bc40"
})

const TransactionEdit = props => {
  return (
      <Edit {...props}>
          <TransactionForm/>
      </Edit>
  )
}

const TransactionCreate = props => {
  return (
      <Create {...props}>
          <TransactionForm/>
      </Create>
  )
}

function App() {
  return (
      <Admin title="Payment Report" dataProvider={firebaseDataProvider(firebase,{})}>
                  <Resource
                      name={"castro"}
                      options={{label: 'ENI - Castro dei Volsci'}}
                      list={TransactionList}
                      edit={TransactionEdit}
                      show={TransactionShow}
                      create={TransactionCreate}
                  />
                  <Resource
                      name={"patrica"}
                      options={{label: 'ENI - Patrica'}}               
                      list={TransactionList}
                      edit={TransactionEdit}
                      show={TransactionShow}
                      create={TransactionCreate}      
                  />
                  <Resource
                      name={"sonnino"}
                      options={{label: 'ENI - Sonnino'}}      
                      list={TransactionList}
                      edit={TransactionEdit}
                      show={TransactionShow}
                      create={TransactionCreate}              
                  />
                  <Resource
                      name={"prossedi"}
                      options={{label: 'Q8 - Prossedi'}}    
                      list={TransactionList}
                      edit={TransactionEdit}
                      show={TransactionShow}
                      create={TransactionCreate}                
                  />
                  <Resource
                      name={"summary"}
                      options={{label: 'Aggregati'}}    
                      list={TransactionList}
                      edit={TransactionEdit}
                      show={TransactionShow}
                      create={TransactionCreate}                
                  />
        </Admin>
  );
}

export default App;
