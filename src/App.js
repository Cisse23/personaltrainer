import './App.css';
import BasicTabs from './components/Tabs'
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Typography variant='h4'>Personal Trainer</Typography>

        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <BasicTabs />

    </div>
  );
}

export default App;


/*
Osa 1
Luo React sovellus, jossa on omat listasivut asiakkaille (customer) 
ja harjoituksille (training). Luo myös navigaatio, jolla sivujen välillä voi siirtyä.
Listasivujen minimivaatimukset:
•	Järjestely (sorting)
•	Tietojen haku/suodatus eri sarakkeiden perusteella
•	Näytä myös asiakkaan nimi harjoitus -listasivulla
•	Muotoile päivämäärä taulkossa esim. mutoon pp.kk.vvvv hh:mm

*/


/*

*/