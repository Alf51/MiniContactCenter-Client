import {MyMessage} from "../socketConnection";
import {action, computed, makeObservable, observable, ObservableSet} from "mobx";

class MessageStore {
    messages: MyMessage[] = []
    logins = observable.set<string>()

    constructor() {
        makeObservable(this, {
            messages: observable,
            logins: observable,
            addMessage: action,
            addLogin: action,
            setLogins: action
        })
    }

    addMessage = (message: MyMessage) => {
        this.messages = [...this.messages, message]
    }

    addLogin = (login: string) => {
        this.logins.add(login)
    }

    setLogins = (logins: Set<string>) => {
        this.logins.clear()
        logins.forEach(element => this.addLogin(element))
    }
}

export default new MessageStore()
