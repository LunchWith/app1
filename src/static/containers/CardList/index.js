import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as actionCreators from '../../actions/card';
import Card from '../../components/card';

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
        actions: PropTypes.shape({
            cardList: PropTypes.func.isRequired
        }).isRequired,
    }

    static defaultProps = {
        dataSet: [],
    }

    componentWillMount() {
        this.props.actions.cardList();
    }

    loadItems = () => {
        this.props.actions.cardList(this.props.dataSet);
    }

    render() {
        const items = (dataSet) => {
            return dataSet.map((card, i) => {
                return <Card key={i} card={card} />;
            });
        };

        return (
            <div>
                <InfiniteScroll hasMore
                    dataLength={this.props.dataSet.length}
                    next={this.loadItems}
                    loader={<h4 className="text-center loading">Loading...</h4>}
                >
                    {items(this.props.dataSet)}
                </InfiniteScroll>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dataSet: state.card.dataSet
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
