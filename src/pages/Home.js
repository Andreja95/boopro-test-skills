import React from "react";
import { useHistory } from 'react-router-dom';

function Home() {
   
  const history = useHistory();

  return (
		<div className="Home">
			<button className="btn btn-lg btn-primary" onClick={() => history.push('/login')}>
				Login
			</button>
		</div>
  );
}

export default Home;