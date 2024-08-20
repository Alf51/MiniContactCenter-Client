import {SimpleForm} from "./SimpleForm";
import {WebSocketControlPanel} from "./WebSocketControlPanel";
import MessageStore from "../../store/messageStore";
import {observer} from "mobx-react-lite";


export const WebChatPanel = observer (() => {
    const {messages} = MessageStore

    return (
        <div>
            <SimpleForm messages={messages}></SimpleForm>
            <WebSocketControlPanel buttonName={"Присоединиться по WS"}></WebSocketControlPanel>
        </div>
    )
})