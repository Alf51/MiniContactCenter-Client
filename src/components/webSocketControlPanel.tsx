import React, {ChangeEvent, useEffect, useState} from "react";
import {MyMessage, useConnect} from "../socketConnection";
import MessageStore from "../store/messageStore";

export function WebSocketControlPanel(obj: { buttonName: string }) {
    const {sendMessage, connectWS, disconnect, isConnection} = useConnect()
    const [inputText, setInputText] = useState<string>('')
    const [message, setMessage] = useState<MyMessage>({from: '', text: "hay from React"})
    const {addMessage} = MessageStore

    useEffect(() => {
        setMessage({
            from: "front",
            text: inputText
        })
    }, [inputText])

    const handleText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
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

    return (
        <div>
            <button disabled={isConnection} onClick={() => connectWS()}>{obj.buttonName}</button>
            <button disabled={!isConnection || !inputText.trim()} onClick={() => handleMessage(message)}>Отправить сообщение</button>
            <button disabled={!isConnection} onClick={() => disconnect()}>Отсоединиться от сервера</button>
            <input  disabled={!isConnection} value={inputText} type={'text'} onChange={handleText}></input>
        </div>
    );
}


