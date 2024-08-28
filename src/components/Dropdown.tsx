import {observer} from "mobx-react-lite";
import React from "react";

interface DropDownProps {
    names: string[],
    onSelected: (value: string) => void
}

export const Dropdown: React.FC<DropDownProps> = observer(({names, onSelected}) => {
    return (
        <select className="form-select" defaultValue={''} onChange={event => onSelected(event.target.value)}>
            <option value={''} disabled>Выберете имя</option>
            {names.map(login => (
                <option key={login}>{login}</option>
            ))}
        </select>
    );
})
