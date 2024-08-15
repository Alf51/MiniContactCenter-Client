import {MyMessage} from "../socketConnection";
import MessageStore from "../store/messageStore";
import {observer} from "mobx-react-lite";

export const SimpleForm = observer(() => {
    const {messages} = MessageStore;

    return (
        <form>
            <textarea readOnly={true} cols={45} rows={5}
                      value={messages.length === 0 ? 'Переписка ещё не начата' : getOneStringMessage(messages)}>
            </textarea>
        </form>
    )
})

function getOneStringMessage(messages: MyMessage[]): string {
    let simpleString = ''

    //todo на reduce ?
    messages.forEach(element => simpleString = simpleString.concat(`${element.from}: ${element.text}\n`))
    return simpleString = simpleString.trim()
}

