import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input, ListSelector } from 'components';
import { debounce } from '../../lib/utils';
import styles from './autocomplete.styl';

const ENTER_KEY_CODE = 13;
const UP_ARROW_KEY_CODE = 38;
const DOWN_ARROW_KEY_CODE = 40;

export default class Autocomplete extends PureComponent {
    static propTypes = {
        values: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        })),
        onSelectValue: PropTypes.func
    };

    static throttleTime = 500;

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            activeListValueId: null,
            isOpenList: false,
            currentValues: []
        };
    }

    render() {
        const { values } = this.props;
        const { inputValue, activeListValueId } = this.state;

        return (
            <div className={styles.root}>
                <Input
                    onKeyDown={this.handleInputKeyDown}
                    value={inputValue}
                    onChange={this.handleInputChange} />
                {this.renderListSelector()}
            </div>
        );
    }

    renderListSelector() {
        const { inputValue, activeListValueId, isOpenList, currentValues } = this.state;
        if (!isOpenList) {
            return null;
        }
        return (
            <div className={styles.list}>
                <ListSelector
                    values={currentValues}
                    activeItemId={activeListValueId}
                    onClickItem={this.handleClickListItem}
                    onHoverItem={this.handleHoverListItem} />
            </div>
        );
    }

    handleInputKeyDown = ({ keyCode, nativeEvent }) => {
        const { onSelectValue } = this.props;
        const { inputValue, isOpenList, currentValues, activeListValueId } = this.state;

        if (keyCode === ENTER_KEY_CODE) {
            if (isOpenList && activeListValueId) {
                this.setState({
                    isOpenList: false,
                    activeListValueId: null
                });
            }
            onSelectValue(inputValue);
            return;
        }

        if (isOpenList && [UP_ARROW_KEY_CODE, DOWN_ARROW_KEY_CODE].includes(keyCode)) {
            nativeEvent.preventDefault();
            const nextItem = this.getNextListItem({
                lastItem: keyCode === DOWN_ARROW_KEY_CODE ? currentValues[0] : currentValues[currentValues.length - 1],
                dir: keyCode === DOWN_ARROW_KEY_CODE ? 1 : -1
            });

            this.setState({
                activeListValueId: nextItem.id,
                inputValue: nextItem.text
            });
        }
    }

    getNextListItem({ lastItem, dir }) {
        const { activeListValueId, currentValues } = this.state;
        let nextItem = lastItem;

        if (activeListValueId) {
            for (let i = 0, len = currentValues.length; i < len; i++) {
                const { id } = currentValues[i];
                if (id === activeListValueId) {
                    nextItem = currentValues[i + dir] ? currentValues[i + dir] : nextItem;
                    break;
                }
            }
        }

        return nextItem;
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            inputValue: value
        });
        this.makeNewValues(value);
    }

    makeNewValues = debounce((value) => {
        const { values } = this.props;
        const normalizeInputValue = value.trim().toLowerCase();
        const currentValues = value === '' ? [] : values.filter(({ text }) => text.toLowerCase().includes(normalizeInputValue));
        this.setState({
            isOpenList: Boolean(currentValues.length),
            currentValues
        });
    }, Autocomplete.throttleTime)

    handleHoverListItem = ({ id, text }) => {
        const { onSelectValue } = this.props;
        this.setState({
            activeListValueId: id
        }, () => onSelectValue(text));
    }

    handleClickListItem = ({ id, text }) => {
        this.setState({
            inputValue: text,
            isOpenList: false
        });
    }
}
