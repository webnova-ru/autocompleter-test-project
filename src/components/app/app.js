import React, { PureComponent } from 'react';
import styles from './app.styl';

export default class App extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return <div className={styles.root}>Hello World</div>;
    }
}
