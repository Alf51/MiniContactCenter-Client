import React, {ChangeEvent, useEffect, useState} from "react";
import {MyMessage, useConnect} from "../../socketConnection";
import MessageStore from "../../store/messageStore";
import {Dropdown} from "../Dropdown";
import {observer} from "mobx-react-lite";

export const WebSocketControlPanel = observer ((obj: { buttonName: string }) => {
    const {sendMessage, sendPrivateMessage, connectWS, disconnect, isConnection} = useConnect()
    const [inputMessage, setInputMessage] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [to, setTo] = useState<string>('')
    const [message, setMessage] = useState<MyMessage>({from: '', text: "hay from React", to: ''})
    const {addMessage, logins} = MessageStore

    useEffect(() => {
        setMessage({
            from: login,
            text: inputMessage,
            to: to
        })
    }, [inputMessage, to])

    const handleInputText = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMessage(event.target.value)
    }
    const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handleTo = (login: string) => {
        setTo(login)
    }

    const makeReset = () => {
        setInputMessage('')
    }

    const handleMessage = (message: MyMessage) => {
        if (sendMessage(message)) {
            addMessage(message)
        }
        makeReset()
    }

    //todo мб как то объединить с handleMessage?
    const handleMessagePrivate = (message: MyMessage) => {
        if (sendPrivateMessage(message)) {
            addMessage(message)
        }
        makeReset()
    }

    const handleConnect = () => {
        connectWS(login)
    }

    const getAllLoginsWithoutCurrentLogin = (): string[] => {
        const loginsWithoutCurrentLogins = new Set<string>(logins)
        loginsWithoutCurrentLogins.delete(login)
        return [...loginsWithoutCurrentLogins]
    }

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <label className="form-label">Введи своё имя:</label>
                <input
                    className="form-control"
                    disabled={isConnection}
                    value={login}
                    type="text"
                    onChange={handleLogin}
                />
            </div>

            <div className="mb-3">
                <button
                    className={`btn btn-primary me-2 ${isConnection || login.trim().length === 0 ? 'opacity-50' : 'opacity-100'}`}
                    disabled={isConnection || login.trim().length === 0}
                    onClick={handleConnect}
                >
                    {obj.buttonName}
                </button>
                <button
                    className={`btn btn-secondary ${!isConnection ? 'opacity-50' : 'opacity-100'}`}
                    disabled={!isConnection}
                    onClick={disconnect}
                >
                    Отсоединиться от сервера
                </button>
            </div>

            <div className="mb-3">
                <input
                    className="form-control"
                    disabled={!isConnection}
                    value={inputMessage}
                    type="text"
                    onChange={handleInputText}
                />
            </div>

            <div className="mb-3 d-flex flex-wrap">
                <button
                    className={`btn btn-success me-2 ${!isConnection || !inputMessage.trim() ? 'opacity-50' : 'opacity-100'}`}
                    disabled={!isConnection || !inputMessage.trim()}
                    onClick={() => handleMessage(message)}
                >
                    Отправить сообщение на сервер
                </button>
                <button
                    className={`btn btn-info ${!isConnection || to.trim().length === 0 || !inputMessage.trim() ? 'opacity-50' : 'opacity-100'}`}
                    disabled={!isConnection || to.trim().length === 0 || !inputMessage.trim()}
                    onClick={() => handleMessagePrivate(message)}
                >
                    Отправить сообщение: {to}
                </button>
            </div>

            <Dropdown onSelected={handleTo} names={getAllLoginsWithoutCurrentLogin()}/>
        </div>
    );
})


