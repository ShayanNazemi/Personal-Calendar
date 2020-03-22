import React, {Component} from 'react';
import './App.css';
import Calendar from "../Components/Calendar/Calendar";

class App extends Component {
    state = {
        date : null,
    };
    render() {
        const {date} = this.state;
        return (
            <div className={'container'}>
                <div className={'app'}>
                    <div className={'calendar'}>
                        <Calendar startYear={1380}
                                  endYear={1400}
                                  value={this.state.date}
                                  setValue={d => this.setState({date : d})}
                        />
                    </div>
                    <div className={'schedule'}>
                        <h1>برنامه زمانی</h1>
                        {
                            date && <h1 className={'date'}>{`${date.year} / ${date.month} / ${date.day}`}</h1>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

export default App;