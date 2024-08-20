import {MyMessage} from "../../socketConnection";
import "../../assets/css/SimpleForm.css";

interface SimpleFormProps {
    messages: MyMessage[]
}

export const SimpleForm = ({messages} : SimpleFormProps) => {
    return (
        <div className={'chat-box'}>
            <ul className={'message-list'}>
                {messages.length === 0 ? (
                    <li className={'no-messages'}>Переписка ещё не начата</li>
                ) : (messages.map((value, index) =>
                        <li className={'message-list'} key={index}><strong>{value.from}</strong>: {value.text} </li>)
                )}
            </ul>
        </div>
    )
}

