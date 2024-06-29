interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}[];

const menu_data: MenuItem[] = [
    
    {
        id: 1,
        has_dropdown: false,
        title: "PRESALE",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "AIRDROP",
        link: "/#feature",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "STKING",
        link: "/#chart",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "RoadMap",
        link: "/#roadMap",
    }
];
export default menu_data;
