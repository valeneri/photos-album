export interface YearEvents {
    _id: string;
    category: string;
    title: string;
    date: string;
    eventsNumber: number;
    events: Event[];
    categoryGroup: CategoryGroup[];
    selected: boolean;
}

export interface Event {
    _id: string;
    title: string;
    date: string;
    full_date: string;
    description: string;
    location: string;
    eventTag: string;
    photosNumber: number;
    photos: Photo[];
    category: Category;
    selected: boolean;
}

export interface Photo {
    _id: string;
    name: string;
    title: string;
    path: string;
    date: string
    eventTag: string
}

export interface Category {
    _id?: string;
    label: string;
    name: string;
}

export interface CategoryGroup {
    category: Category
    selected?: boolean
    value: number;
}
