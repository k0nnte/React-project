import '../About/About.scss';
import '../old_app/light.scss';
import { useContext } from 'react';
import { Contex } from '../contex/contex';
import { Link, useLocation, useLoaderData } from '@remix-run/react';
import { loader } from '../../app/routes/details.$id';
const About: React.FC = () => {
  const searchParams = useLocation();
  const queryParams = new URLSearchParams(searchParams.search);
  const contex = useContext(Contex);
  const { theme } = contex;
  const rezult = useLoaderData<typeof loader>();

  if (rezult?.error) {
    return (
      <div className={`about ${theme ? '' : 'black'}`} id="test">
        <div className="text">
          <>Error</>
          <Link to={`/?${queryParams}`}>
            <button style={{ cursor: 'pointer' }}>close</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`about ${theme ? '' : 'black'}`} id="test">
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
      <Link to={`/?${queryParams}`}>
        <button style={{ cursor: 'pointer' }}>close</button>
      </Link>
    </div>
  );
};

export default About;
