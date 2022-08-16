import {makeAutoObservable} from "mobx";
import {fetchOnThisDayBirths, IBirthday} from "../adapters/fetchOnThisDayBirths";
import sortBy from "lodash/sortBy";
import {createContext, useContext} from "react";

export class OnThisDayBirthsStore {
    private _data: IBirthday[] = [];
    private _isLoading: boolean = false;
    private _error: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    public get error(): string {
        return this._error;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get birthDays(): IBirthday[] {
        return sortBy(this._data, 'year');
    }

    public fetchBirths = async () => {
        try {
            this.setIsLoading(true);
            const today = new Date();
            this.setData(await fetchOnThisDayBirths(today));
        } catch (e) {
            let message = 'Unknown Error';
            if (e instanceof Error) message = e.message;
            this.setError(message);
        } finally {
            this.setIsLoading(false);
        }
    }

    public setError = (error: string) => {
        this._error = error;
    }

    private setData = (data: IBirthday[]) => {
        this._data = data
    }

    private setIsLoading = (state: boolean) => {
        this._isLoading = state;
    }
}

const StoreContext = createContext(new OnThisDayBirthsStore());
export const useOnThisDayBirths = (): OnThisDayBirthsStore => useContext(StoreContext);
