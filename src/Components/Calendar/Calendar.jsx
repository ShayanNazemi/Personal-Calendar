import React, {Component} from 'react';
import jalali from "jalaali-js";
import './Calendar.css';

const MONTHS = {
    1 : 'فروردین',
    2 : 'اردیبهشت',
    3 : 'خرداد',
    4 : 'تیر',
    5 : 'مرداد',
    6 : 'شهریور',
    7 : 'مهر',
    8 : 'آبان',
    9 : 'آذر',
    10 : 'دی',
    11 : 'بهمن',
    12 : 'اسفند',
};

class Calendar extends Component {
    state = {
        month : 3,
        year : 1399,
        initWeekday : null,
        nMonth : null,
    };

    componentDidMount() {
        this.updateTable(this.state.month, this.state.year)
    }

    updateTable = (month, year) => {
        const firstDay = jalali.toGregorian(year, month, 1);
        const d = new Date(firstDay.gy, firstDay.gm - 1, firstDay.gd);
        this.setState({initWeekday : (d.getDay() + 1)%7, nMonth : this.numberOfDays(month, year)})
    };

    numberOfDays = (month, year) => {
        if(month < 7) {
            return 31;
        } else if (month < 12) {
            return 30
        } else {
            if(jalali.isLeapJalaaliYear(year)) {
                return 30
            } else {
                return 29
            }
        }
    };

    gregorianDate = (day) => {
        const d = jalali.toGregorian(this.state.year, this.state.month, day);
        const gdate = new Date(d.gy, d.gm-1, d.gd);
        return `${d.gd} ${Intl.DateTimeFormat('en-US', {month : 'short'}).format(gdate)}`
    };

    handleSelectMonth = (e) => {
        this.setState({month: parseInt(e.target.value)}, () =>
            this.updateTable(this.state.month, this.state.year));
    };

    handleSelectYear = (e) => {
        this.setState({year: parseInt(e.target.value)}, () =>
            this.updateTable(this.state.month, this.state.year));
    };

    handleChangeMonth = (i) => {
        const {month, year} = this.state;
        if(month + i < 1) {
            this.setState({month: 12, year: year - 1}, () =>
                this.updateTable(this.state.month, this.state.year));
        } else if ( month + i > 12) {
            this.setState({month: 1, year: year + 1}, () =>
                this.updateTable(this.state.month, this.state.year));
        } else {
            this.setState({month: month + i}, () =>
                this.updateTable(this.state.month, this.state.year));
        }
    };

    render() {
        const {initWeekday, nMonth, year, month} = this.state;
        const {startYear, endYear, value, setValue} = this.props;
        return (
            <div className={'persian__calendar'}>
                <div className={'persian__calendar__header'}>
                    <button className={'prev_month'} onClick={() => this.handleChangeMonth(-1)}>
                        {'ماه قبل'}
                    </button>
                    <span>
                        <select value={this.state.month} onChange={this.handleSelectMonth}>
                            {
                                Array(12).fill(0).map((i, idx) => (
                                    <option value={idx+1}>{MONTHS[idx+1]}</option>
                                ))
                            }
                        </select>
                    </span>
                    <span>
                        <select value={this.state.year} onChange={this.handleSelectYear}>
                            {
                                Array.from({length : endYear - startYear + 1}, (y, i) => i + startYear).map(year => (
                                    <option value={year}>{year}</option>
                                ))
                            }
                        </select>
                    </span>

                    <button className={'next_month'} onClick={() => this.handleChangeMonth(1)}>
                        {'ماه بعد'}
                    </button>
                </div>
                <div className={'persian__calendar__table__container'}>
                    <table className={'persian__calendar__table'}>
                        <tr>
                            <th>{'شنبه'}</th>
                            <th>{'یک‌شنبه'}</th>
                            <th>{'دوشنبه'}</th>
                            <th>{'سه‌شنبه'}</th>
                            <th>{'چهار‌شنبه'}</th>
                            <th>{'پنج‌شنبه'}</th>
                            <th>{'جمعه'}</th>
                        </tr>
                        {
                            initWeekday !== null && nMonth !== null && Array(Math.ceil((initWeekday + nMonth) / 7)).fill(0).map((row, idxRow) => (
                                <tr>
                                    {
                                        Array(7).fill(0).map((day, idxDay) => {
                                            let n = idxRow * 7 + idxDay;
                                            let date = n - initWeekday + 1;
                                            return (
                                                <td className={`${value && value.year === year && value.month === month && value.day === date ? 'selected' : ''} ${idxDay === 6 ? 'friday' : ''}`}
                                                    onClick={() => n >= initWeekday && date <= nMonth && setValue({year : year, month : month, day : date})}
                                                >
                                                    <span>
                                                        {
                                                            n >= initWeekday && date <= nMonth ? date : ''
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            n >= initWeekday && date <= nMonth ? this.gregorianDate(date) : ''
                                                        }
                                                    </span>

                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </table>
                </div>

            </div>
        );
    }
}

export default Calendar;