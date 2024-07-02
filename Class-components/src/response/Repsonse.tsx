import { Component, ReactNode } from 'react';
import responseApi from './responseApi';
import { Iobject, Idata } from '../interfases/interfases';
import Cart from '../Cart/Cart';

class Response extends Component<Iobject, Idata> {
  constructor(props: Iobject) {
    super(props);
    this.state = {
      mas: [],
    };
  }

  componentDidUpdate(prevProps: Iobject): void {
    if (prevProps.search !== this.props.search) {
      if (this.props.search !== '') {
        responseApi(this.props.search).then((data) =>
          this.setState({ mas: data.results })
        );
      }
    }
  }

  render(): ReactNode {
    return (
      <div>
        {this.state.mas.map((item, index) => (
          <Cart key={index} response={item} isfull={false} />
        ))}
      </div>
    );
  }
}

export default Response;
