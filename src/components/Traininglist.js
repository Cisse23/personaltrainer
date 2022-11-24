import React, { useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import dayjs from "dayjs";

export default function Traininglist(){
    
    const [trainings, setTrainings] = React.useState([]);
    const link = 'https://customerrest.herokuapp.com/api/trainings'
    
    //https://ag-grid.com/react-data-grid/value-formatters/
    const dateFormatter = (params) => {
        return (
            dayjs(params.data.date).format('DD.MM.YYYY HH.mm')
        );
        //return '£' + formatNumber(params.value);
    };

    const getCustomer = (params) => {
        console.log(params.data.links[2].toString())
        return params.data.links[2];
    };
    
    const columns = [
        {field: "date", headerName: "ISO date"}, 
        {field: "date", headerName: "Date formatted", valueFormatter: dateFormatter}, 
        //Muotoile päivämäärä taulkossa esim. mutoon pp.kk.vvvv hh:mm
        //dayjs().format("YYYY-MM-DD"); // 2021-05-26
        {field: "duration"},
        {field: "activity"},
        {field: "customer", valueGetter: getCustomer} //Näytä myös asiakkaan nimi harjoitus -listasivulla
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
        .then(data => setTrainings(data.content))
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
        .then(data => setTrainings(data.content))
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
"date": "2022-11-21T13:00:38.697+00:00",
"duration": 60,
"activity": "Spinning",
"content": [],
"links": [
{
"rel": "self",
"href": "https://customerrest.herokuapp.com/api/trainings/368"
},
{
"rel": "training",
"href": "https://customerrest.herokuapp.com/api/trainings/368"
},
{
"rel": "customer",
"href": "https://customerrest.herokuapp.com/api/trainings/368/customer"
}
]
}
 */