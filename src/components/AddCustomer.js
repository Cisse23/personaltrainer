import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props){
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
      firstname: '',
      lastname: '',
      streetaddress: '', 
      postcode: '', 
      city: '',
      email: '',
      phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        //vois lisätä validoinnin että postinumero on numero
        //esim react hook form kirjasto
        console.log(customer);
        props.addCustomer(customer);
        setOpen(false);
        //props.getCustomers();     //ei toimi, sanoo props.getCustomer() is not a function...   
    }
 
    return (
        <>
          <br></br>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Customer
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new customer</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Firstname"
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Lastname"
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Streetaddress"
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                fullWidth
                variant="standard"
              />
                <TextField
                margin="dense"
                label="Phone"
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
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
      );

}

/*
You can add new customer by calling /customers endpoint using the POST method and giving a new customer inside the request body as a JSON string
Header: 'Content-Type': 'application/json'
Body:
{
firstname: "John"
lastname: "Smith"
email: "j.s@smith.com"
phone: "343-2332345"
Haaga-Helia Front End course Juha Hinkula
streetaddress: "Yellow Street 23"
postcode: "344342"
city: "Yellowstone"
}
*/


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