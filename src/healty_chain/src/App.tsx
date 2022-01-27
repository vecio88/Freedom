import './App.css';
import { Route, Switch, Redirect, Router } from "react-router-dom"
import history from "./config-history"
import Home from './components/home';
import PazienteComponente from './components/CartellaClinica/PazienteComp/PazienteComponente';
import OperatoreComponente from './components/CartellaClinica/Operatore/OperatoreComponente';
import 'bootstrap/dist/css/bootstrap.min.css';
import { instantiateContract, web3connect } from './services/data-context';
import Web3 from 'web3';
import contract from 'truffle-contract';

P



function App() {
  web3connect()
  const web3  = instantiateContract()
  
  return (
      <div className="App">
        <div className="App-header">
          <Router history={history}>
            <Switch>
                <Route path={"/"} exact>
                    <Home />
                </Route>

                <Route path="/paziente">
                  <PazienteComponente />
                </Route>

                <Route path="/operatore">
                  <OperatoreComponente />
                </Route>

                <Redirect to={"/"} />
            </Switch>
          </Router>
        </div>
      </div>
  );

}

export default App;
