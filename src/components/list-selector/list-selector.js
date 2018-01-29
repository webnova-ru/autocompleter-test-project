import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './list-selector.styl';
import classNames from 'classnames';

export default class ListSelector extends PureComponent {
    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })),
        onClickItem: PropTypes.func,
        onHoverItem: PropTypes.func,
        activeItemId: PropTypes.number
    };

    constructor(props) {
        super(props);

        this.state = {
            hoverListValueId: null
        };
    }


    render() {
        const { values, onClickItem, onHoverItem, activeItemId } = this.props;

        if (!values.length) {
            return null;
        }

        return (
            <ul className={styles.root}>
                { values.map((value) => {
                    const { id, text } = value;
                    const classes = classNames(styles.item, {
                        [styles.item_active]: activeItemId === id
                    });
                    return (
                        <li
                            key={id}
                            className={classes}
                            onClick={() => onClickItem(value)}
                            onMouseEnter={() => onHoverItem(value)}>
                            {text}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
