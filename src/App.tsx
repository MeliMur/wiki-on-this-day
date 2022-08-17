import './Base.scss';
import React, {useEffect, useState} from 'react';
import {useOnThisDayBirths} from "./stores/OnThisDayBirths.store";
import {observer} from "mobx-react-lite";
import {BirthDayList} from "./components/BirthDayList";
import {Modal} from "./components/Modal";

export const App: React.FC = observer(() => {
    const {error, fetchBirths, birthDays, isLoading, setError} = useOnThisDayBirths();
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        setShowError(!!error);
    }, [error]);

    const onModalClose = () => {
        setShowError(false);
        setError('');
    }

    return (
        <div className="on-this-day">
            <button className='btn btn--primary' onClick={fetchBirths}>Fetch data</button>
            {isLoading && 'loading...'}
            {!isLoading && <BirthDayList birthDays={birthDays}/>}
            <Modal onClose={onModalClose} show={showError} title={'Something went wrong...'}>
                <span className='error'>{error}</span>
            </Modal>
        </div>
    );
})

