import React, {useState} from "react";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

export default function ExportCSV(props){
    const [trainings, setTrainings] = React.useState([]);

    //console.log(props.data.links[2].href);
    const getTrainings = (() => {
        fetch(props.data.links[2].href)
        .then(response => {
            if(response.ok)
                return response.json();
            else
            alert('Error when getting trainings ' + response.statusText);
        })
        .then(data => setTrainings(data))
        .catch(err => console.error)
    }, [] );
    //console.log(dayjs(trainings[0].date).format('DD.MM.YYYY HH.mm'), trainings[0].duration, trainings[0].activity);
    const csvData = [
        ["Firstname", "Lastname", "Streetaddress", "Postcode", "City", "Email", "Phone" ],
        [props.data.firstname, props.data.lastname, props.data.streetaddress, props.data.postcode, props.data.city, props.data.email, props.data.phone ],
        //[dayjs(trainings[0].date).format('DD.MM.YYYY HH.mm'), trainings[0].duration, trainings[0].activity],

      ];

      //date, duration, activity

      
    return(
        <CSVLink 
        style={{color: "green"}} 
        data={csvData} 
        separator={";"}
        filename={"my-trainings.csv"} >Download</CSVLink>
    );
}

//https://www.npmjs.com/package/react-csv