import React from 'react'

import './index.css'

export default class DrumPad extends React.Component {

    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyPress)
    }

    componentWillMount = () => {
        document.removeEventListener('keydown', this.handleKeyPress)
    }

    handleKeyPress = (e) => {
        if (e.keyCode === this.props.code)
            this.activatePad()
    }

    activatePad = () => {
        this.liftPadNameUp()
        this.playSound()
    }

    liftPadNameUp = () => {
        const name = this.props.name.replace(/-/g, ' ')
        this.props.onPadPress(name)
    }

    playSound = () => {
        const drumPad = document.getElementById(this.props.name)
        drumPad.currentTime = 0
        drumPad.play()
    }

    render() {
        return (
            <li className={"drum-pad " + this.props.name} onClick={this.activatePad}>
                <span>{this.props.trigger}</span>
                <audio id={this.props.name} className="clip" src={this.props.src} type="audio/mp3" preload="auto">
                    Your browser does not support the <code>audio</code> element.
                </audio>
            </li>
        )
    }
}
