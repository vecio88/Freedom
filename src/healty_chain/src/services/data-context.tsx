import Web3 from 'web3';
import ContractJson from '../../../../build/contracts/Subfree.json';
import contract from "@truffle/contract";
export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const TODOS_CONTRACT_INSTANTIATED = 'TODOS_CONTRACT_INSTANTIATED';
export const TODOS_FETCHED = 'TODOS_FETCHED';
export const TODO_ADDED = 'TODO_ADDED';

export const defaultState = {
  web3: null,
  contratto: []
};

export function web3connect() {
  return (dispatch: (arg0: { type: any; payload: Web3; }) => void) => {
    const web3 = (window as any).web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      console.log("Sono in metamask")
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      console.log("Sono in Ganache")
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
      });
    }
  };
}

/*function web3connect() {
    const web3 = (window as any).web3;
    console.log(typeof web3)

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
      // Use Mist/MetaMask's provider.
      console.log("Sono in metamask")
      return new Web3(web3.currentProvider)
    } else {
      console.log("Sono in Ganache")
      return new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
    }
}*/

export function instantiateContract() {
  console.log("instantiateContract")
  return (dispatch: any, getState: () => { (): any; new(): any; web3: any; }) => {
    const web3 = getState().web3;
    const contratto = TruffleContract(ContractJson);
    /*   todos.setProvider(web3.currentProvider);
    return todos.deployed().then((todosContract) => {
      dispatch({
        type: TODOS_CONTRACT_INSTANTIATED,
        payload: todosContract
      });
    });*/
  };
}

export function fetchTodos() {
  console.log("fetchTodos")
  /*return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const todosContract = state.todosContract;
    todosContract.getTodos().then((todos) => {
      dispatch({
        type: TODOS_FETCHED,
        payload: todos.map((todo) => web3.toAscii(todo))
      });
    });
  };*/
}

export function addTodo(/* payload */) {
  console.log("addTodo")
  /*
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const todosContract = getState().todosContract;
    web3.eth.getAccounts((err, accounts) => {
      todosContract.addTodo(web3.fromAscii(payload), {
        from: accounts[0]
      }).then((results) => {
        dispatch({
          type: TODO_ADDED,
          payload
        });
      });
    });
  }; */
}