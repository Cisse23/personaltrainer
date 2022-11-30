import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist(){
    const [customers, setCustomers] = React.useState([]);
    const link = 'https://customerrest.herokuapp.com/api/customers'
    const columns = [
        {field: "firstname", sortable: true, filter: true}, 
        {field: "lastname", sortable: true, filter: true},
        {field: "streetaddress", sortable: true, filter: true},
        {field: "postcode", sortable: true, filter: true},
        {field: "city", sortable: true, filter: true},
        {field: "email", sortable: true, filter: true},
        {field: "phone", sortable: true, filter: true}
    ]


    const getCustomers = (() => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Error when getting customers ' + response.statusText);
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error)
    }, [] );

    useEffect(() => {
        fetch(link)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Error when getting customers' + response.statusText)
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error)
    }, []);



    return(
        <div className="ag-theme-material"
            style={{height: '900px', width: '90%', margin: 'auto'}} 
        >
            <AgGridReact
                columnDefs={columns}
                rowData={customers}
            />
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