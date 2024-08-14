import {MyMessage} from "../socketConnection";
import MessageStore from "../store/messageStore";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

export const SimpleForm = observer(() => {
    const {messages} = MessageStore;

    return (
        <form>
            <textarea readOnly={true} cols={45} rows={5} value={getOneStringMessage(messages)}>
            </textarea>
        </form>
    )
})

function getOneStringMessage(messages: MyMessage[]): string {
    console.log('getOneStringMessage')
    let simpleString = ''

    messages.forEach(element => simpleString = simpleString.concat(element.text + '\n'))
    return simpleString = simpleString.trim()
}

