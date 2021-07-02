import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { FormCheck, Table } from 'react-bootstrap';
import { evidence, ghosts } from './evidence.json';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmed: [
                { name: evidence[0], value: false },
                { name: evidence[1], value: false },
                { name: evidence[2], value: false },
                { name: evidence[3], value: false },
                { name: evidence[4], value: false },
                { name: evidence[5], value: false }
            ],
            confirmedNot: [
                { name: evidence[0], value: false },
                { name: evidence[1], value: false },
                { name: evidence[2], value: false },
                { name: evidence[3], value: false },
                { name: evidence[4], value: false },
                { name: evidence[5], value: false }
            ],
            good: [],
            bad: []
        }
    }

    getEvidenceTypes() {
        return evidence.map(v => (
            <th key={v}>
                {v}
            </th>
        ));
    }

    filterGhosts() {
        let good = [];
        let bad = [];

        for (const g of ghosts) {
            let pass = true;

            for (const con of this.state.confirmed)
                if (con.value && !g.evidence[con.name])
                    pass = false;

            for (const con of this.state.confirmedNot)
                if (con.value && g.evidence[con.name])
                    pass = false;

            if (pass) 
                good.push(g);
            else
                bad.push(g);
        }

        this.setState({good: good});
        this.setState({bad: bad});
    }

    getResults(input) {
        return input.map(g => (
            <tr key={g.ghost} className="bad">
                <td>{g.ghost}</td>
                <td>{g.evidence['EMF Level 5'] && 'X'}</td>
                <td>{g.evidence['Fingerprints'] && 'X'}</td>
                <td>{g.evidence['Freezing Temps'] && 'X'}</td>
                <td>{g.evidence['Ghost Orb'] && 'X'}</td>
                <td>{g.evidence['Ghost Writing'] && 'X'}</td>
                <td>{g.evidence['Sprit Box'] && 'X'}</td>
            </tr>
        ));
    }

    handleConfirmCheck(not, name) {
        let confirmed = not ? this.state.confirmedNot : this.state.confirmed;

        for (let item of confirmed)
            if (name === item.name)
                item.value = !item.value;
        
        if (not)
            this.setState({confirmedNot: confirmed});
        else
            this.setState({confirmed: confirmed});

        this.filterGhosts();
    }

    getCheckConfirmed(not) {
        let confirmed = not ? this.state.confirmedNot : this.state.confirmed;

        return confirmed.map(c => (
            <td key={c.name}>
                <FormCheck
                    checked={c.value}
                    onChange={() => this.handleConfirmCheck(not, c.name)}
                />
            </td>
        ));
    }

    componentDidMount() {
        this.filterGhosts();
    }

    render() {
        return (
            <div>
                <header>
                    <h1 className="text-center mt-5 mb-3">Phasmophobia Evidence Calculator</h1>
                </header>
                <div className="container">
                    <h2>Evidence</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td></td>
                                {this.getEvidenceTypes()}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-success">Confirmed</td>
                                {this.getCheckConfirmed(false)}
                            </tr>
                            <tr>
                                <td className="text-danger">Confirmed NOT</td>
                                {this.getCheckConfirmed(true)}
                            </tr>
                        </tbody>
                    </Table>

                    <h2>Results</h2>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Ghost</th>
                                {this.getEvidenceTypes()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.getResults(this.state.good)}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default App;
