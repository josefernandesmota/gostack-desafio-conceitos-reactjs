import React, {useEffect, useState} from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);
  useEffect(() => {
    const getRepository = async () => {
        const { data } = await api.get('repositories');
        setRepository(data);
    }
    getRepository();
  }, [])

  async function handleAddRepository() {
    const {data} = await api.post('repositories',{
            title: "Desafio ReactJS",
            url: "https://github.com/josefernandesmota/gostack-desafio-conceitos-reactjs",
            techs: ["React", "Node.js"],
        });
        setRepository([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if(response.status === 204)
      setRepository(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
          repositories.map(({id, title})=>(
        <li key={id}>
          {title}

          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>
        ))
      }
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;