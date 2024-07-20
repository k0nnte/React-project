import { useLocation, useNavigate, useParams } from 'react-router-dom';
import request from '../response/request';
import { Iresponse } from '../interfases/interfases';
import { useEffect, useState } from 'react';
import './About.scss';
import Loading from '../Loading/Loading';
const About = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('search') || '';
  const page = queryParams.get('page') || '';
  const navigator = useNavigate();
  const [rez, setrez] = useState<Iresponse[]>();
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const fech = async (searchQuery: string, page: string) => {
    try {
      setIsLoad(true);
      const mass = await request(searchQuery, page);
      setrez(mass.results);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setErrorText((error as Error).message || 'Ошибка загрузки данных');
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    fech(search, page);
  }, [page, search]);

  const ckick = () => {
    navigator(`/?${queryParams}`);
  };

  if (isError) {
    return <div>{errorText.toUpperCase()}</div>;
  }

  if (isLoad) {
    return <Loading />;
  }

  if (rez) {
    const rezult = rez[Number(id)];
    return (
      <div className="about">
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
        <button onClick={ckick}>close</button>
      </div>
    );
  }
};

export default About;
