import React, { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";

export default function Traininglist(){
    
    const [trainings, setTrainings] = React.useState([]);
    //const [customerName, setCustomerName] = React.useState('');
    //const link = 'https://customerrest.herokuapp.com/api/trainings';
    const link = 'https://customerrest.herokuapp.com/gettrainings';

    //https://ag-grid.com/react-data-grid/value-formatters/
    const dateFormatter = (params) => {
        return (
            dayjs(params.data.date).format('DD.MM.YYYY HH.mm')
        );
        //return '£' + formatNumber(params.value);
    };

    /*
    const getCustomer = (params) => {
        console.log(params.data.links[2].href);
        console.log(params.data.customer.name);
        if(params.data.customer.firstname)
            return params.data.customer.firstname;
        else return "Can't get customer name"
        
        return params.data.links[2].href;
    };
    */
    
    const getCustomerName = (params) => {
        console.log(params.data.customer.firstname + ' ' + params.data.customer.lastname);
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    };

    const columns = [
        {field: "id"},
        {field: "date", headerName: "ISO date"}, 
        {field: "date", headerName: "Date formatted", valueFormatter: dateFormatter}, 
        //Muotoile päivämäärä taulkossa esim. mutoon pp.kk.vvvv hh:mm
        //dayjs().format("YYYY-MM-DD"); // 2021-05-26
        {field: "duration"},
        {field: "activity"},
        {field: "customer", valueGetter: getCustomerName} //Näytä myös asiakkaan nimi harjoitus -listasivulla
    ]

    const defaultColDef = useMemo( () => ({
        sortable: true,
        filter: true
    }), [] );

    const getTrainings = (() => {
        fetch(link)
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
        fetch(link)
        .then(response => {
            if(response.ok)
                return response.json();
            else
            alert('Error when getting trainings ' + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error)
    }, [] );



    return(
        <div className="ag-theme-material"
            style={{height: '900px', width: '90%', margin: 'auto'}} 
        >
            <AgGridReact
                columnDefs={columns}
                defaultColDef={defaultColDef}
                rowData={trainings}
            />
        </div>
    );
}

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