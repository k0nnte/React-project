// import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAllPeopleQuery } from '../response/request';
import Loading from '../Loading/Loading';
import style from './About.module.scss';
import { useContext } from 'react';
import { Contex } from '../contex/contex';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import ligth from '../light.module.scss';

const About: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const search = queryParams.get('search') || '';
  const page = queryParams.get('page') || '';
  const { id } = router.query;
  const numericId = id ? parseInt(id as string, 10) : null;
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
    router.push(`/?${queryParams}`);
  };

  if (isSuccess) {
    const rezult = data.results[Number(numericId)];
    return (
      <div className={`${style.about} ${theme ? '' : ligth.black}`}>
        <div className={style.text}>
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
