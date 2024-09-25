/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
/* eslint-disable func-names */
import React, { Component } from 'react';

import NoInternet from '../screens/Hotel/Error/NoInternet';

export default function (ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false,
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online') {
        this.setState({ isDisconnected: false });
        return;
      }
      // eslint-disable-next-line consistent-return
      return this.setState({ isDisconnected: true });
    };

    render() {
      const { isDisconnected } = this.state;
      // TODO Fix Network Detector
      // prettier-ignore
      if (isDisconnected) return <NoInternet />;
      return <ComposedComponent {...this.props} />;
    }
  }

  return NetworkDetector;
}
