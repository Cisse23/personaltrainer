import React, { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import { Button } from "@mui/material";

export default function Traininglist(){
    
    const [trainings, setTrainings] = React.useState([]);
    const link_add = 'https://customerrest.herokuapp.com/api/trainings';
    const link_get = 'https://customerrest.herokuapp.com/gettrainings';

    //https://ag-grid.com/react-data-grid/value-formatters/
    const dateFormatter = (params) => {
        return (
            dayjs(params.data.date).format('DD.MM.YYYY HH.mm')
        );
        //return '£' + formatNumber(params.value);
    };
    
    const getCustomerName = (params) => {
        //console.log(params.data.customer.firstname + ' ' + params.data.customer.lastname);
        if(params.data.customer)
            return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    };

    const columns = [
        {field: "delete", width: 120,
        cellRenderer: params =>
        <Button
        size="small"
        color="error"
        onClick={() => deleteTraining(params.data)}>
            DELETE
        </Button>
        },
        {field: "id", width:100},
        //{field: "date", headerName: "ISO date", width:300}, 
        {field: "date", headerName: "Date", valueFormatter: dateFormatter}, 
        //Muotoile päivämäärä taulkossa esim. mutoon pp.kk.vvvv hh:mm
        //dayjs().format("YYYY-MM-DD"); // 2021-05-26
        {field: "duration", width:120},
        {field: "activity"},
        {field: "customer", valueGetter: getCustomerName} //Näytä myös asiakkaan nimi harjoitus -listasivulla
    ]

    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true,
    }), [] );


    const getTrainings = (() => {
        fetch(link_get)
        .then(response => {
            if(response.ok)
                return response.json();
            else
            alert('Error when getting trainings ' + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error)
    }, [] );

    useEffect(() => {
        fetch(link_get)
        .then(response => {
            if(response.ok)
                return response.json();
            else
            alert('Error when getting trainings ' + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error)
    }, [] );

    //NOTE! To save time of the training (for example 27.11.19 09:00) the format must be ISO-8601 (You can
    //use for example moment’s toISOString() function)
    const addTraining = (training) => {
        fetch(link_add,
        {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => {
            if(response.ok)
                getTrainings();
            else alert("Something went wrong when getting trainings...")
        })
        .catch(err => console.err)
    }

    //'https://customerrest.herokuapp.com/api/trainings/
    const deleteTraining = (data) => {
        console.log(data);
        console.log("Deleting " + data.activity + " from: " + data.id)
        if(window.confirm("Are you sure you wanna delete? "))
        fetch('https://customerrest.herokuapp.com/api/trainings/' + data.id, {method: 'DELETE'})
        .then(response => {
            if(response.ok)
                getTrainings();
            else alert("Error when deleting training")
        })
        .catch(err => console.error)
    }

    return(
        <div className="ag-theme-material"
            style={{height: '900px', width: '90%', margin: 'auto'}} 
        >
            <AddTraining addTraining={addTraining} />
            <AgGridReact
                columnDefs={columns}
                defaultColDef={defaultColDef}
                rowData={trainings}
            />
        </div>
    );
}

/*
Add training and link it to customer
You can add new training by calling /trainings endpoint using the POST method and giving a new training with customer reference link inside the request body as a JSON string.
Header: 'Content-Type': 'application/json'
Body:
{
date: "2018-1-1",
activity: "Spinning",
duration: "50",
customer: "https://localhost:8080/api/customers/2"
}
NOTE! To save also time of the training (for example 27.11.19 09:00) the format must be ISO-8601 (You can use for example moment’s toISOString() function)
2019-11-27T09:00:00.000+0000
//https://day.js.org/docs/en/display/as-iso-string
*/


/**
 Esimerkkiolio
{
"links": [
{
"rel": "self",
"href": "https://customerrest.herokuapp.com/api/trainings"
},
{
"rel": "profile",
"href": "https://customerrest.herokuapp.com/api/profile/trainings"
}
],
"content": [
{
    "date": "2022-11-30T11:21:02.984+00:00",
    "duration": 60,
    "activity": "Spinning",
    "content": [],
    "links": [
    {
    "rel": "self",
    "href": "https://customerrest.herokuapp.com/api/trainings/2357"
    },
    {
    "rel": "training",
    "href": "https://customerrest.herokuapp.com/api/trainings/2357"
    },
    {
    "rel": "customer",
    "href": "https://customerrest.herokuapp.com/api/trainings/2357/customer"
    }
    ]
},
 */

//https://customerrest.herokuapp.com/gettrainings
/*
[
{
"id": 2471,
"date": "2022-11-30T12:10:15.600+00:00",
"duration": 60,
"activity": "Spinning",
"customer": {
"id": 2456,
"firstname": "John",
"lastname": "Johnson",
"streetaddress": "5th Street",
"postcode": "23110",
"city": "Flintsone",
"email": "john@mail.com",
"phone": "232-2345540"
}
},
*/