import {MyMessage} from "../socketConnection";
import {action, makeObservable, observable} from "mobx";

class MessageStore {
    messages: MyMessage[] = []
    constructor() {
        this.messages = getFakeMessage()
        makeObservable(this, {
            messages: observable,
            getMessages: action,
            addMessage: action,
            addAllMessage: action,
            setMessages: action
        })
    }

    getMessages = (): MyMessage[] => {
        return this.messages
    }

    addMessage = (message: MyMessage) => {
        this.messages = [...this.messages, message]
    }

    addAllMessage = (messages: MyMessage[]) => {
        this.messages = [...this.messages, ...messages] //чтобы мог отследить
    }

    setMessages = (messages: MyMessage[]) => {
        this.messages = messages
    }
}

export default new MessageStore()

function getFakeMessage(): MyMessage[] {
    const test1: MyMessage = {from: 'front', text: "Helllo Server"}
    const test2: MyMessage = {from: 'server', text: "Helllo Front"}
    return [test1, test2]
}