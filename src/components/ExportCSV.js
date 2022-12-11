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
    //if(trainings){
       // console.log(trainings.content[0].toString());}
    const rows = "";

    for (let i = 0; i< trainings.length; i++) {
      rows += "[" + trainings[i].date + "," + trainings[i].duration + "," + trainings[i].activity + "],";
       
    }

       const csvData = [
         /*headers = [
            { label: "Date", key: "date" },
            { label: "Activity", key: "activity" },
            { label: "Duration", key: "duration" }
            
         ],*/
      
            //data = {rows}
            ["Firstname", "Lastname", "Streetaddress", "Postcode", "City", "Email", "Phone" ],
            [props.data.firstname, props.data.lastname, props.data.streetaddress, props.data.postcode, props.data.city, props.data.email, props.data.phone ],
            [rows]
            //trainings.map((training) =>  "[" + training.activity + "," + training.duration + "],")
            //[trainings[0].activity, trainings[0].duration]


            //[dayjs(trainings[0].date).format('DD.MM.YYYY HH.mm'), trainings[0].duration, trainings[0].activity],

        ];

      //date, duration, activity

      
    return(
        <CSVLink 
        style={{color: "green"}} 
        data={csvData} 
       //data={trainings}
        separator={";"}
        filename={"my-trainings.csv"} >Download</CSVLink>
    );
}

//https://www.npmjs.com/package/react-csv