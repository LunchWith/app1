import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Write from '../Card/write';

import './style.scss';


class HomeView extends React.Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        // statusText: PropTypes.string,
        // userName: PropTypes.string,
    };

    static defaultProps = {
        // statusText: '',
        // userName: ''
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    render() {
        return (
            <div className="container">
                {this.props.isAuthenticated ? <Write /> : null}
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


export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
