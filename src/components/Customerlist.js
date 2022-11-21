import React from "react"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
;

export default function Customerlist(){
    const [customers, setCustomers] = React.useState([]);
    
    const columns = [
        {field: "firstname"}, 
        {field: "lastname"},
        {field: "streetaddress"},
        {field: "postcode"},
        {field: "city"},
        {field: "email"}]

    return(
        <div className="ag-theme-material"
        style={{height: '700px', width: '70%', margin: 'auto'}} >
            <AgGridReact
            columnDefs={columns}
            rowData={customers}
            >

            </AgGridReact>
        </div>
    );
}

/*Esimerkkiolio
{
"firstname": "John",
"lastname": "Johnson",
"streetaddress": "5th Street",
"postcode": "23110",
"city": "Flintsone",
"email": "john@mail.com",
"phone": "232-2345540",
"content": [],
"links": [
{
"rel": "self",
"href": "https://customerrest.herokuapp.com/api/customers/1"
},
{
"rel": "customer",
"href": "https://customerrest.herokuapp.com/api/customers/1"
},
{
"rel": "trainings",
"href": "https://customerrest.herokuapp.com/api/customers/1/trainings"
}
]
}
*/