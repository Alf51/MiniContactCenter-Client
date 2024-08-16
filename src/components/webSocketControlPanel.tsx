import React, {ChangeEvent, useEffect, useState} from "react";
import {MyMessage, useConnect} from "../socketConnection";
import MessageStore from "../store/messageStore";

export function WebSocketControlPanel(obj: { buttonName: string }) {
    const {sendMessage, sendPrivateMessage, connectWS, disconnect, isConnection} = useConnect()
    const [inputMessage, setInputMessage] = useState<string>('')
    const [inputPrivateMessage, setInputPrivateMessage] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [to, setTo] = useState<string>('')
    const [message, setMessage] = useState<MyMessage>({from: '', text: "hay from React", to: ''})
    const {addMessage} = MessageStore

    useEffect(() => {
        setMessage({
            from: login,
            text: inputMessage,
            to: to
        })
    }, [inputMessage])

    //todo не понятно текст чего ? А есть ещё и handleMessage
    const handleText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMessage(event.target.value)
    }

    const handlePrivateText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputPrivateMessage(event.target.value)
    }

    const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handleTo = (event: ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value)
    }

    const makeReset = () => {
        setInputMessage('')
        setInputPrivateMessage('')
    }

    const handleMessage = (message: MyMessage) => {
        if (sendMessage(message)) {
            addMessage(message)
        }
        makeReset()
    }

    //todo мб как то объединить с handleMessage?
    //todo пока не готово
    const handleMessagePrivate = (message: MyMessage) => {
        if (sendPrivateMessage(message)) {
            addMessage(message)
        }
        makeReset()
    }

    const handleConnect = () => {
        connectWS(login)
    }

    return (
        <div>
            <label>Введи своё имя: </label>
            <input disabled={isConnection} value={login} type={'text'} onChange={handleLogin}></input>
            <button disabled={isConnection || login.trim().length === 0}
                    onClick={handleConnect}>{obj.buttonName}</button>
            <button disabled={!isConnection} onClick={() => disconnect()}>Отсоединиться от сервера</button>

            <br/>
            <label>Имя получателя: </label>
            <input disabled={!isConnection} value={to} type={'text'} onChange={handleTo}></input>
            <br/>
            <br/>

            <input disabled={!isConnection} value={inputMessage} type={'text'} onChange={handleText}></input>
            <button disabled={!isConnection || !inputMessage.trim()} onClick={() => handleMessage(message)}>Отправить
                сообщение на сервер
            </button>
            <button disabled={!isConnection || to.trim().length === 0 || !inputMessage.trim()}
                    onClick={() => handleMessagePrivate(message)}>Отправить
                сообщение: {to}</button>
        </div>
    );
}


