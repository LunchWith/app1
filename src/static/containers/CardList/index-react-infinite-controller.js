import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

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

    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true
        };
    }

    // componentWillMount() {
    //     this.props.actions.cardList();
    // }

    loadItems() {
        console.log('before request')
        console.log(this.state.hasMoreItems);
        this.props.actions.cardList().then({
        });
        this.setState({
            hasMoreItems: false,
        });
        console.log('after request')
        console.log(this.state.hasMoreItems)
    }

    render() {
        // const mapToComponent = (dataSet) => {
        //     return dataSet.map((card, i) => {
        //         return <Card key={card.id} card={card} />;
        //     });
        // };
        console.log(this.state.hasMoreItems);
        const items = (dataSet) => {
            return dataSet.map((card, i) => {
                return <Card key={card.id} card={card} />;
            });
        };
        // this.props.cards.map((card, i) => {
        //     items.push(
        //         <Card key={card.id} card={card} />
        //     );
        // });


        return (
            <div>
                <InfiniteScroll pageStart={0}
                    loadMore={this.loadItems.bind(this)}
                    hasMore={this.state.hasMoreItems}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {items(this.props.dataSet)}
                </InfiniteScroll>
                {/* {items(this.props.dataSet)} */}
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
