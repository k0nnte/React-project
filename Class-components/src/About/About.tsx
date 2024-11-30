import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAllPeopleQuery } from '../response/request';
import Loading from '../Loading/Loading';
import './About.scss';
import { useContext } from 'react';
import { Contex } from '../contex/contex';

const About: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || '';
  const page = queryParams.get('page') || '';
  const navigator = useNavigate();
  const { id } = useParams();
  const contex = useContext(Contex);
  const { theme } = contex;

  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetAllPeopleQuery([search, page]);

  if (isError) {
    return <div>Не удалось загрузить</div>;
  }
  if (isLoading || isFetching) {
    return <Loading />;
  }

  const ckick = () => {
    navigator(`/?${queryParams}`);
  };

  if (isSuccess) {
    const rezult = data.results[Number(id)];
    return (
      <div className={`about ${theme ? '' : 'black'}`}>
        <div className="text">
          <p>name: {rezult.name}</p>
          <p>height: {rezult.height}</p>
          <p>mass: {rezult.mass}</p>
          <p>hair_color: {rezult.hair_color}</p>
          <p>skin_color: {rezult.skin_color}</p>
          <p>eye_color: {rezult.eye_color}</p>
          <p>birth_year: {rezult.birth_year}</p>
          <p>gender: {rezult.gender}</p>
        </div>
        <button onClick={ckick} style={{ cursor: 'pointer' }}>
          close
        </button>
      </div>
    );
  }
};

export default About;
