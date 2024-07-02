import { Component, ReactNode } from 'react';
import { Icart } from '../interfases/interfases';

class Cart extends Component<Icart> {
  constructor(props: Icart) {
    super(props);
  }

  render(): ReactNode {
    if (this.props.isfull) {
      return (
        <div className="cart">
          <p>write 1 of the requests</p>
        </div>
      );
    }
    return (
      <div className="cart">
        <p>{this.props.response.name}</p>
        <p>{this.props.response.gender}</p>
        <p>{this.props.response.hair_color}</p>
        <p>{this.props.response.eye_color}</p>
        <p>{this.props.response.birth_year}</p>
        <p>{this.props.response.height}</p>
        <p>{this.props.response.skin_color}</p>
      </div>
    );
  }
}

export default Cart;
