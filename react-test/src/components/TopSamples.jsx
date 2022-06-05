import React, { Component } from 'react'
import { getSamplesTop } from "../Services/sample-service";
import Sample from "./Sample";

class TopSamples extends Component {
    constructor(props) {
        super(props)
        this.state = {
            samples: []
        }
    }

    componentDidMount = () => {
        getSamplesTop().then(samples => this.setState({samples: samples}))
    }

    render() {
        const { samples } = this.state
        return (
            <div>
                {samples.map(sample => <div key={sample.id}><Sample  sample={sample}/></div>)}
            </div>
        )
    }
}

export default TopSamples
