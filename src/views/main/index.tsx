import React from 'react';
import { observer } from 'mobx-react';
import store from '../../stores';

const { mainStore } = store;

@observer
export default class Main extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    console.log('this: ', this.props);

    return <div>main</div>;
  }
}

interface IProps {

}

interface IState {

}