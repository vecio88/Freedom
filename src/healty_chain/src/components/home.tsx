import { Link } from "react-router-dom"

const Home: React.FC = () => {

    return (
        
        <div className="App">
            <div className="App-header">
                <div className='mainContainer'>
                    <Link to="/paziente">
                        <button className='btnTypeUser'>Paziente</button>
                    </Link>
                    <Link to="/operatore">
                        <button className='btnTypeUser'>Operatore Medico</button>
                    </Link>
                </div>
            </div>
        </div>
      
    )
}

export default Home
