import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ExportCSV from "./ExportCSV";
import { Button } from "@mui/material";


export default function Customerlist(){
    const [customers, setCustomers] = React.useState([]);
    const link_customers = 'https://customerrest.herokuapp.com/api/customers/'
    const columns = [
        {field: "export trainings",
            cellRenderer: params => 
            <ExportCSV data={params.data} />
        },
        {field: "edit", width: 120,
            cellRenderer: params => 
            <EditCustomer  data={params.data} editCustomer={editCustomer} /> ,

        },
        {field: "delete", width: 120,
            cellRenderer: params =>
            <Button
            size="small"
            color="error"
            onClick={() => deleteCustomer(params.data)}>
                DELETE
            </Button>
        },
        {field: "firstname", width: 150, sortable: true, filter: true}, 
        {field: "lastname", width: 150, sortable: true, filter: true},
        {field: "streetaddress", sortable: true, filter: true},
        {field: "postcode", width: 130, sortable: true, filter: true},
        {field: "city", width: 150, sortable: true, filter: true},
        {field: "email", width: 180, sortable: true, filter: true},
        {field: "phone", width: 150, sortable: true, filter: true}
    ]

    const getCustomers = (() => {
        fetch(link_customers)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Error when getting customers ' + response.statusText);
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error)
    }, [] );

    //useEffect({getCustomers}, []);
    
    useEffect(() => {
        fetch(link_customers)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                alert('Error when getting customers' + response.statusText)
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error)
    }, []);

    const addCustomer = (customer) => {
        fetch(link_customers,
        {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(customer)
        })
        .then(response => {
        if(response.ok)
            getCustomers();
        else alert('Add customer / something went wrong')
        })
        .catch(err => console.error)
    }

    const editCustomer = (customer, data) => {
        console.log("Editing: " + customer.firstname);
        fetch(data,
            {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(customer)
            })
            .then(response => {
                if(response.ok)
                    getCustomers();
                else
                    alert('Error when editing customer');
            })
            .catch(err => console.error)
    }

    const deleteCustomer = (data) => {
        console.log("Deleting " + data.firstname + " from: " + data.links[1].href)
        if (window.confirm("Are you sure you wanna delete?"))
        fetch(data.links[1].href,  {method: 'DELETE'})
        .then( response => {
            if(response.ok)
                getCustomers();
            else alert("Error when deleting customer")
        })
        .catch(err => console.error)
    }

    return(
        <div className="ag-theme-material"
            style={{height: '900px', width: '90%', margin: 'auto'}} 
        >
            <AddCustomer addCustomer={addCustomer} getCustomers={getCustomers} />
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