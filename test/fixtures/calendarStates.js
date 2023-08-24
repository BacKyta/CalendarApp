export const events = [
    {
        id: '1',
        start  : new Date('2023-12-25 14:00:00'),
        end    : new Date('2023-12-25 16:00:00'),
        title  : 'Cumple de kevin',
        notes  : 'Alguna nota',
    },
    {
        id: '2',
        start  : new Date('2023-03-25 10:00:00'),
        end    : new Date('2023-03-25 12:00:00'),
        title  : 'Cumple de mama',
        notes  : 'Alguna nota',
    },
];

export const initialState = {

    isLoadingEvents: true,
    events         : [],
    activeEvent: null

};

export const calendarWithEventsState = {

    isLoadingEvents: false,
    events         : [ ...events ],
    activeEvent    : null,

};

export const calendarActiveWithEventState = {

    isLoadingEvents: false,
    events         : [ ...events ],
    activeEvent    : { ...events[0]},

};