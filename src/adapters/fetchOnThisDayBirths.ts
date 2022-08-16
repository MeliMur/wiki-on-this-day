export interface IBirthday {
    text: string,
    year: number
}

export const fetchOnThisDayBirths = async (date: Date): Promise<IBirthday[]> => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data.births;
}
