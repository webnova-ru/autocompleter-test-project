import React, { PureComponent } from 'react';
import { Autocomplete } from 'components';
import styles from './app.styl';

const values = [
    { id: 1, text: 'Январь' },
    { id: 2, text: 'Февраль' },
    { id: 3, text: 'Март' },
    { id: 4, text: 'Апрель' },
    { id: 5, text: 'Май' },
    { id: 6, text: 'Июнь' },
    { id: 7, text: 'Июль' },
    { id: 8, text: 'Август' },
    { id: 9, text: 'Сентябрь' },
    { id: 10, text: 'Октябрь' },
    { id: 11, text: 'Ноябрь' },
    { id: 12, text: 'Декабрь' }
];

export default class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    render() {
        const { value } = this.state;
        return (
            <div className={styles.root}>
                <Autocomplete values={values} onSelectValue={this.handleSelectValue} />
                <div className={styles.note}>Вы выбрали: <span>{value}</span></div>
            </div>
        );
    }

    handleSelectValue = (value) => {
        this.setState({
            value
        });
    }
}
