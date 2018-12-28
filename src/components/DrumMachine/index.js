import React from 'react'

import './index.css'
import Samples from './samples'
import Display from '../Display'
import DrumPad from '../DrumPad'

// For bank selection
let i = 0
const samples_array = Object.keys(Samples)

export default class DrumMachine extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            samples: Samples[samples_array[i]],
            lastPad: '--',
            currentBank: samples_array[i].replace(/_/g, ' ')
        }
    }

    componentWillMount = () => {
        document.addEventListener('keydown', this.handleSpaceBarEvent)
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.handleSpaceBarEvent)
    }

    handleSpaceBarEvent = (e) => {
        if (e.keyCode === 32)
            this.switchBank()
    }

    setLastPad = (drumPad) => {
        this.setState({ lastPad: drumPad })
    }

    switchBank = () => {
        // Pick next bank or go back to the start
        i = (i === samples_array.length - 1) ? 0 : (i + 1)
        this.setState({
            samples: Samples[samples_array[i]],
            currentBank: samples_array[i].replace(/_/g, ' ')
        })
    }

    render() {

        const drumPads = this.state.samples.map((pad, key) => {
            return (
                <DrumPad key={key}
                    name={pad.name}
                    src={pad.src}
                    trigger={pad.trigger}
                    code={pad.code}
                    onPadPress={this.setLastPad}
                    />
            )
        })

        return (
            <div id="drum-machine" className="drum-machine">
                <ul className="drum-pads">
                    {drumPads}
                </ul>
                <Display 
                    lastPad={this.state.lastPad} 
                    currentBank={this.state.currentBank}
                    switchBank={this.switchBank}
                    />
            </div>
        )
    }
}
