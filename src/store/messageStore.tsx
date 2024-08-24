import {MyMessage} from "../socketConnection";
import {action, makeObservable, observable} from "mobx";

class MessageStore {
    messages: MyMessage[] = []
    //todo мб это не сюда положить, странно что в Store с сообщениями попали все логины
    logins = observable.set<string>()

    constructor() {
        makeObservable(this, {
            messages: observable,
            logins: observable,
            addMessage: action,
            addLogin: action,
            setLogins: action,
            deleteLogin: action
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

    deleteLogin = (login: string) => {
        this.logins.delete(login)
    }
}

export default new MessageStore()
