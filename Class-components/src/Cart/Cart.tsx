import { Component, ReactNode } from 'react';
import {
  IapiEndpoints,
  Icart,
  Ifilms,
  Iplanet,
  Iresponse,
  Ispecies,
  Istarship,
  Ivehicle,
} from '../interfases/interfases';

class Cart extends Component<Icart> {
  constructor(props: Icart) {
    super(props);
  }

  istype = () => {
    const response = this.props.response;
    if ((response as Iplanet).climate !== undefined) {
      return 'planet';
    } else if ((response as Ifilms).title !== undefined) {
      return 'film';
    } else if ((response as Ispecies).classification !== undefined) {
      return 'species';
    } else if ((response as Istarship).starship_class !== undefined) {
      return 'starship';
    } else if ((response as Ivehicle).vehicle_class !== undefined) {
      return 'vehicle';
    } else if ((response as IapiEndpoints).people !== undefined) {
      return 'apiEndpoints';
    } else if ((response as Iresponse).gender !== undefined) {
      return 'people';
    }
  };

  render(): ReactNode {
    const { response } = this.props;
    const responseType = this.istype();
    switch (responseType) {
      case 'planet':
        return (
          <div>
            <p>name: {(response as Iplanet).name}</p>
            <p>rotation_period: {(response as Iplanet).rotation_period}</p>
            <p>orbital_period: {(response as Iplanet).orbital_period}</p>
            <p>diameter: {(response as Iplanet).diameter}</p>
            <p>climate: {(response as Iplanet).climate}</p>
            <p>gravity: {(response as Iplanet).gravity}</p>
            <p>terrain: {(response as Iplanet).terrain}</p>
            <p>surface_water: {(response as Iplanet).surface_water}</p>
            <p>population: {(response as Iplanet).population}</p>
          </div>
        );
      case 'film':
        return (
          <div>
            <p>title: {(response as Ifilms).title}</p>
            <p>episode_id: {(response as Ifilms).episode_id}</p>
            <p>director: {(response as Ifilms).director}</p>
            <p>producer: {(response as Ifilms).producer}</p>
            <p>release_date: {(response as Ifilms).release_date}</p>
          </div>
        );
      case 'species':
        return (
          <div>
            <p>name: {(response as Ispecies).name}</p>
            <p>classification: {(response as Ispecies).classification}</p>
            <p>designation: {(response as Ispecies).designation}</p>
            <p>average_height: {(response as Ispecies).average_height}</p>
            <p>skin_colors: {(response as Ispecies).skin_colors}</p>
            <p>hair_colors: {(response as Ispecies).hair_colors}</p>
            <p>eye_colors: {(response as Ispecies).eye_colors}</p>
            <p>average_lifespan: {(response as Ispecies).average_lifespan}</p>
            <p>language: {(response as Ispecies).language}</p>
          </div>
        );
      case 'vehicle':
        return (
          <div>
            <p>name: {(response as Ivehicle).name}</p>
            <p>model: {(response as Ivehicle).model}</p>
            <p>manufacturer: {(response as Ivehicle).manufacturer}</p>
            <p>cost_in_credits: {(response as Ivehicle).cost_in_credits}</p>
            <p>length: {(response as Ivehicle).length}</p>
            <p>
              max_atmosphering_speed:{' '}
              {(response as Ivehicle).max_atmosphering_speed}
            </p>
            <p>crew: {(response as Ivehicle).crew}</p>
            <p>passengers: {(response as Ivehicle).passengers}</p>
            <p>cargo_capacity: {(response as Ivehicle).cargo_capacity}</p>
            <p>consumables: {(response as Ivehicle).consumables}</p>
            <p>vehicle_class: {(response as Ivehicle).vehicle_class}</p>
          </div>
        );
      case 'starship':
        return (
          <div>
            <p>name: {(response as Istarship).name}</p>
            <p>model: {(response as Istarship).model}</p>
            <p>manufacturer: {(response as Istarship).manufacturer}</p>
            <p>cost_in_credits: {(response as Istarship).cost_in_credits}</p>
            <p>length: {(response as Istarship).length}</p>
            <p>
              max_atmosphering_speed:{' '}
              {(response as Istarship).max_atmosphering_speed}
            </p>
            <p>crew: {(response as Istarship).crew}</p>
            <p>passengers: {(response as Istarship).passengers}</p>
            <p>cargo_capacity: {(response as Istarship).cargo_capacity}</p>
            <p>consumables: {(response as Istarship).consumables}</p>
            <p>
              hyperdrive_rating: {(response as Istarship).hyperdrive_rating}
            </p>
            <p>MGLT: {(response as Istarship).MGLT}</p>
            <p>starship_class: {(response as Istarship).starship_class}</p>
          </div>
        );
      case 'apiEndpoints':
        return (
          <div>
            {Object.keys(response).map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        );
      case 'people':
        return (
          <div>
            <p>name: {(response as Iresponse).name}</p>
            <p>height: {(response as Iresponse).height}</p>
            <p>mass: {(response as Iresponse).mass}</p>
            <p>hair_color: {(response as Iresponse).hair_color}</p>
            <p>skin_color: {(response as Iresponse).skin_color}</p>
            <p>eye_color: {(response as Iresponse).eye_color}</p>
            <p>birth_year: {(response as Iresponse).birth_year}</p>
            <p>gender: {(response as Iresponse).gender}</p>
          </div>
        );
    }
  }
}

export default Cart;
