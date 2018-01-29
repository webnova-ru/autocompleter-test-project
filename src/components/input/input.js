import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './input.styl'

export default class Input extends PureComponent {
    render() {
        const { ...attrs } = this.props;

        return (
            <div className={styles.root}>
                <input className={styles.input} {...attrs} />
            </div>
        );
    }
}
