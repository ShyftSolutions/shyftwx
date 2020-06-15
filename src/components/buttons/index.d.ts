declare type GroupedButtonsProps = {
    items: GroupedButtonItem[];
    action: (item: GroupedButtonItem) => void;
};

declare type GroupedButtonItem = {
    value: string;
    selected: boolean;
};
