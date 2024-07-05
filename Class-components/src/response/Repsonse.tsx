import { Component, ReactNode } from 'react';
import responseApi from './responseApi';
import { Iobject, Idata } from '../interfases/interfases';
import Cart from '../Cart/Cart';
import '../response/Repsonse.scss';

class Response extends Component<Iobject, Idata> {
  constructor(props: Iobject) {
    super(props);
    this.state = {
      mas: [],
    };
  }

  componentDidMount(): void {
    if (this.props.search !== '') {
      responseApi(this.props.search).then((data) =>
        this.setState({ mas: data.results })
      );
    } else {
      responseApi(this.props.search).then((data) =>
        this.setState({ mas: [data] })
      );
    }
  }

  componentDidUpdate(prevProps: Iobject): void {
    if (prevProps.search !== this.props.search) {
      if (this.props.search !== '') {
        responseApi(this.props.search).then((data) =>
          this.setState({ mas: data.results })
        );
      } else {
        responseApi(this.props.search).then((data) =>
          this.setState({ mas: [data] })
        );
      }
    }
  }

  render(): ReactNode {
    return (
      <div className="wrapbottom">
        {this.state.mas.map((item, index) => (
          <Cart key={index} response={item} />
        ))}
      </div>
    );
  }
}

export default Response;
