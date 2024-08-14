import {MyMessage} from "../socketConnection";
import {action, makeObservable, observable} from "mobx";

class MessageStore {
    messages: MyMessage[] = []

    constructor() {
        makeObservable(this, {
            messages: observable,
            addMessage: action,
        })
    }

    addMessage = (message: MyMessage) => {
        this.messages = [...this.messages, message]
    }
}

export default new MessageStore()
