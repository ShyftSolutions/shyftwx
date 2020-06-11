declare type ModelSelectorProps = {
    options: string[];
    label?: string;
    action: (option: string) => void;
};