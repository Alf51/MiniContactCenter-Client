import {SimpleForm} from "./SimpleForm";
import {WebSocketControlPanel} from "./WebSocketControlPanel";
import MessageStore from "../../store/messageStore";
import {observer} from "mobx-react-lite";


export const WebChatPanel = observer (() => {
    const {messages} = MessageStore

    return (
        <div className="container mt-4">
            <SimpleForm messages={messages}></SimpleForm>
            <WebSocketControlPanel buttonName={"Присоединиться по WS"}></WebSocketControlPanel>
        </div>
    )
})