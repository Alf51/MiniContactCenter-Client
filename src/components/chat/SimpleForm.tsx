import {MyMessage} from "../../socketConnection";

interface SimpleFormProps {
    messages: MyMessage[]
}

export const SimpleForm = ({messages} : SimpleFormProps) => {
    return (
        <div className="chat-box">
            <ul className="list-group">
                {messages.length === 0 ? (
                    <li className="list-group-item">Переписка ещё не начата</li>
                ) : (
                    messages.map((value, index) => (
                        <li className="list-group-item" key={index}><strong>{value.from}</strong>: {value.text}</li>
                    ))
                )}
            </ul>
        </div>
    )
}

