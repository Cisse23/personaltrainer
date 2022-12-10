import React, {useEffect} from "react";
import {Button, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from "dayjs";

export default function AddTraining(props){
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });
  const [customers, setCustomers]=React.useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };
    
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    //lisää validointi että duration on numero
    //esim react hook form kirjasto
    console.log(training);
    if(training.customer == null)
      setTraining({...training, customer: 'tietoturva-asiakas'});
    else if(training.customer.length === 4)
      setTraining({...training, customer: 'https://customerrest.herokuapp.com/api/customers/' + training.customer});
    props.addTraining(training);
    console.log("Added training for " + training.customer)
    setOpen(false);
  }

  useEffect(() => {
    fetch('https://customerrest.herokuapp.com/api/customers/')
    .then(response => {
        if(response.ok)
            return response.json();
        else
            alert('Error when getting customers' + response.statusText)
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.error)
  }, []);

  //NOTE! To save also time of the training (for example 27.11.19 09:00) the format must be ISO-8601 (You can use for example moment’s toISOString() function)
  //2019-11-27T09:00:00.000+0000
  //https://day.js.org/docs/en/display/as-iso-string -> dayjs('2019-01-25').toISOString()
  const changeDate = (newDate) => {
    setTraining({...training, date: dayjs(newDate).toISOString()});
  }

  const selectCustomer = (event) => {
    console.log("Customer was set to: " + event.customer.links[1].href);
    setTraining({...training, customer: event.customer.links[1].href});
  }

  return(
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new training</DialogTitle>
        <DialogContent>
          <br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={training.date}
              onChange={(newValue) => {
                changeDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <InputLabel id="CustomerSelectLabel">Customer</InputLabel>
          <Select 
          labelId="CustomerSelectLabel"
          id="Customer"
          value={training.customer.id}
          label="Customer"
          fullWidth
          variant="standard"
          setSelectValue="true"
          onChange={(newValue) => {
            selectCustomer(newValue);
          }}
          >
          {customers.map((customer, index) =>(
            <MenuItem key={index} value={customer.id}>
            {customer.firstname + " " + customer.lastname}</MenuItem>
          ))}
          </Select>

          <TextField
            margin="dense"
            label="CustomerById"
            value={training.customer}
            onChange={e => setTraining({...training, customer: e.target.value})}
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Duration"
            value={training.duration}
            onChange={e => setTraining({...training, duration: e.target.value})}
            fullWidth
            variant="standard"
          />
          
          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            onChange={(e) => setTraining({...training, activity: e.target.value})}
            fullWidth
            variant="standard"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}