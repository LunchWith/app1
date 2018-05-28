import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as actionCreators from '../../actions/card';
import Card from '../../components/card';

const style = {
    height: 400,
    border: '1px solid green',
    margin: 6,
    padding: 8,
};


class CardListView extends React.Component {
    static propTypes = {
        dataSet: PropTypes.arrayOf(
            PropTypes.shape({
                username: PropTypes.string.isRequired,
                contents: PropTypes.string.isRequired,
                imagePath: PropTypes.string,
                videoid: PropTypes.string,
            })
        ),
        // hasMoreItems: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            cardList: PropTypes.func.isRequired
        }).isRequired,
    }

    static defaultProps = {
        dataSet: [],
        // hasMoreItems: true,
        // nextHref: null
    }

    state = {
        items: Array.from({ length: 6 })
    }

    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(Array.from({ length: 6 }))
            });
        }, 1500);
    }

    render() {
        return (
            <div>
                <InfiniteScroll hasMore
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    loader={<h4>Loading...</h4>}
                >
                    {this.state.items.map((i, index) => {
                        return (
                            <div style={style} key={index}>
                                div - #{index}
                            </div>
                        );
                    })}
                </InfiniteScroll>
            </div>


        );
    }
}


const mapStateToProps = (state) => {
    return {
        dataSet: state.card.dataSet,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CardListView);
export { CardListView as CardListViewNotConnected };
