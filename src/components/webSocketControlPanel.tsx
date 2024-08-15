import React, {ChangeEvent, useEffect, useState} from "react";
import {MyMessage, useConnect} from "../socketConnection";
import MessageStore from "../store/messageStore";

export function WebSocketControlPanel(obj: { buttonName: string }) {
    const {sendMessage, connectWS, disconnect, isConnection} = useConnect()
    const [inputText, setInputText] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [to, setTo] = useState<string>('')
    const [message, setMessage] = useState<MyMessage>({from: '', text: "hay from React", to: ''})
    const {addMessage} = MessageStore

    useEffect(() => {
        setMessage({
            from: login,
            text: inputText,
            to: to
        })
    }, [inputText])

    const handleText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handleTo = (event: ChangeEvent<HTMLInputElement>) => {
        setTo(event.target.value)
    }

    const makeReset = () => {
        setInputText('')
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
        if (sendMessage(message)) {
            addMessage(message)
        }
        makeReset()
    }

    return (
        <div>
            <button disabled={isConnection} onClick={() => connectWS(login)}>{obj.buttonName}</button>
            <button disabled={!isConnection || !inputText.trim()} onClick={() => handleMessage(message)}>Отправить
                сообщение
            </button>
            <button disabled={!isConnection} onClick={() => disconnect()}>Отсоединиться от сервера</button>
            <input disabled={!isConnection} value={inputText} type={'text'} onChange={handleText}></input>
            <br/>
            <input value={login} type={'text'} onChange={handleLogin}></input>
            <input value={to} type={'text'} onChange={handleTo}></input>
            <button onClick={() => handleMessagePrivate(message)}>Отправить сообщение: {to}</button>
        </div>
    );
}


