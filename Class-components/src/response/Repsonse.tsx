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
      iserror: false,
    };
  }

  componentDidMount(): void {
    if (this.props.search !== '') {
      responseApi(this.props.search)
        .then((data) =>
          this.setState({ mas: data.results, isLoad: false, iserror: false })
        )
        .catch(() => {
          this.setState({ isLoad: false, iserror: true });
        });
    } else {
      responseApi(this.props.search)
        .then((data) =>
          this.setState({ mas: [data], isLoad: false, iserror: false })
        )
        .catch(() => {
          this.setState({ isLoad: false, iserror: true });
        });
    }
  }

  componentDidUpdate(prevProps: Iobject): void {
    if (prevProps.search !== this.props.search) {
      if (this.props.search !== '') {
        this.setState({ isLoad: true });
        responseApi(this.props.search)
          .then((data) =>
            this.setState({ mas: data.results, isLoad: false, iserror: false })
          )
          .catch(() => {
            this.setState({ isLoad: false, iserror: true });
          });
      } else {
        this.setState({ isLoad: true });
        responseApi(this.props.search)
          .then((data) =>
            this.setState({ mas: [data], isLoad: false, iserror: false })
          )
          .catch(() => {
            this.setState({ isLoad: false, iserror: true });
          });
      }
    }
  }

  render(): ReactNode {
    // if (this.state.iserror) {
    //   throw new Error('Not Faund');
    // }
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
