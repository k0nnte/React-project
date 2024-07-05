import { Component, ReactNode } from 'react';
import responseApi from './responseApi';
import { Iobject, Idata } from '../interfases/interfases';
import Cart from '../Cart/Cart';
import '../response/Repsonse.scss';
import Loading from '../Loading/Loading';

class Response extends Component<Iobject, Idata> {
  constructor(props: Iobject) {
    super(props);
    this.state = {
      mas: [],
      isLoad: true,
    };
  }

  componentDidMount(): void {
    if (this.props.search !== '') {
      responseApi(this.props.search).then((data) =>
        this.setState({ mas: data.results, isLoad: false })
      );
    } else {
      responseApi(this.props.search).then((data) =>
        this.setState({ mas: [data], isLoad: false })
      );
    }
  }

  componentDidUpdate(prevProps: Iobject): void {
    if (prevProps.search !== this.props.search) {
      if (this.props.search !== '') {
        this.setState({ isLoad: true });
        responseApi(this.props.search).then((data) =>
          this.setState({ mas: data.results, isLoad: false })
        );
      } else {
        this.setState({ isLoad: true });
        responseApi(this.props.search).then((data) =>
          this.setState({ mas: [data], isLoad: false })
        );
      }
    }
  }

  render(): ReactNode {
    return (
      <div className="wrapbottom">
        {this.state.isLoad ? (
          <Loading />
        ) : (
          this.state.mas.map((item, index) => (
            <Cart key={index} response={item} />
          ))
        )}
      </div>
    );
  }
}

export default Response;
