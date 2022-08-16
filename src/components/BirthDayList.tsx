import './styles/BirthdayList.scss';
import React from "react";
import {IBirthday} from "../adapters/fetchOnThisDayBirths";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";


interface IProps {
    birthDays: IBirthday[]
}

export const BirthDayList: React.FC<IProps> = (props: IProps) => {
    const {birthDays} = props;

    if (isEmpty(birthDays)) {
        return <></>
    }


    return (<div className='table'>
        <div className='table__head'>
            <div className='table__row'>
                <div className='table__column'>Year</div>
                <div className='table__column'>Description</div>
            </div>
        </div>


        <div className='table__body'>
            {map(birthDays, (birth) => (
                <div key={birth.text} className='table__row'>
                    <div>{birth.year}</div>
                    <div>{birth.text}</div>
                </div>
            ))}
        </div>
    </div>)
}
