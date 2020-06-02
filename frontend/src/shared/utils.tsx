
// date from backend come as DD-MM-YYYY format, then output it as  new Date(YYYY, MM, DD);
const convertStringToDate = (date: string) => {
    const dateSplit = date.split('-');
    return new Date(parseInt(dateSplit[2]), parseInt(dateSplit[1]), parseInt(dateSplit[0]));
}

const textDate = (date: string) => {
    const dateSplit = date.split('-');
    const year = dateSplit[2];
    const month = dateSplit[1];

    const monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    date = monthsList[parseInt(month) - 1] + ' ' + year;

    return date;
}

const sortYearsByDateDesc = (years: any[]) => {
    return years.sort((a: any, b: any) => {
        return parseInt(b.date) - parseInt(a.date)
    })
}

const sortEventsByDateAsc = (events: any[]) => {
    return events.sort((a: any, b: any) => {
        return (+(convertStringToDate(a.full_date)) - +(convertStringToDate(b.full_date)))
    });
};

export { convertStringToDate, textDate, sortEventsByDateAsc, sortYearsByDateDesc };