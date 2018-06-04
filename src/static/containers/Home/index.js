import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardWriteView from '../SubContainers/cardWrite';
import CardListView from '../SubContainers/cardList';

import './style.scss';


class HomeView extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <div className="container">
                {this.props.isAuthenticated ? <CardWriteView /> : undefined}
                <CardListView />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText,
        isAuthenticated: state.auth.isAuthenticated,
    };
};


export default connect(mapStateToProps, null)(HomeView);
export { HomeView as HomeViewNotConnected };
