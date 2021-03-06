import React, { Component } from 'react';
import Board from './Board';
import CustomColorButton from './CustomColorButton';
import { CustomSizeButton } from './CustomSizeButton';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.handleMode = this.handleMode.bind(this);
        this.sendClearCommand = this.sendClearCommand.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleCustomSize = this.handleCustomSize.bind(this);
        this.getColor = this.getColor.bind(this);
        this.state = {
             sendClear: false,
             runningMode: 'BW',
             customizedColor: '#F17013',
             gridNumber: 768,
        };
    }

    //input: int    return a 2D array as the board
    initBoard(gridNumber) {
        let grids = new Array(gridNumber);
        let keyValue = 0;
        for (let i=0; i<grids.length; i++) {
            grids[i] = {
                position: keyValue,
                isColored: false,
                gridColor: ''
            };
            keyValue++;
        }
        return grids;
    }

    handleMode(id) {
        if (this.state.runningMode !== id) {
            this.sendClearCommand();
            this.setState({runningMode: id});
        }
    }

    sendClearCommand() {
        this.setState({sendClear: true});
    }

    handleClear() {
        this.setState({sendClear: false});
    }

    handleCustomSize(n) {
        this.sendClearCommand();
        this.setState({gridNumber: n});
    }

    getColor(color) {
        this.setState({customizedColor: color});
    }

    render() {
        return (
            <div className='main'>
                <div className='menu'>
                    <button id='clear' className='buttons' onClick={this.sendClearCommand}>Clear</button>
                    <button id='rainbow' className='buttons' onClick={this.handleMode.bind(this, 'rainbow')}>Rainbow Mode</button>
                    <button id='BW' className='buttons' onClick={this.handleMode.bind(this, 'BW')}>Black/White Mode</button>
                    <CustomColorButton onColor={this.getColor} onMode={this.handleMode} />
                    <CustomSizeButton onSizeChange={this.handleCustomSize}/>
                </div>
                <Board mode={this.state.runningMode} shouldBeClear={this.state.sendClear} onClear={this.handleClear} grids={this.initBoard(this.state.gridNumber)} customizedColor={this.state.customizedColor}/>
            </div>
        );
    }
}

export default Menu