import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class About extends React.Component<IAboutProps, IAboutState> {
  constructor(props: IAboutProps) {
    super(props);
  }

  render() {
    return <div>About</div>;
  }
}

interface IAboutProps {

}

interface IAboutState {

}