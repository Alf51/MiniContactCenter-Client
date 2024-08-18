import {observer} from "mobx-react-lite";
import React from "react";

interface DropDownProps {
    names: string[],
    onSelected: (value: string) => void
}

//todo эже просто список. Название так себе. Мб пропсы передавать ? А не из стора брать ? Например в классе обёртки следить за стора и отдавать готовое
export const Dropdown: React.FC<DropDownProps> = observer(({names, onSelected}) => {
    return (
        <select defaultValue={''} onChange={event => onSelected(event.target.value)} >
            <option value={''} disabled>Выберете имя</option>
            {names.map(login => (
                <option key={login}>{login}</option>
            ))}
        </select>
    );
})
