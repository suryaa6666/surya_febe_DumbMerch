import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NavbarComponent from '../components/NavbarComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { io } from 'socket.io-client'
import { useState, useEffect, useContext } from 'react'
import Contact from '../components/complain/Contact'
import Chat from '../components/complain/Chat'
import { UserContext } from '../context/userContext'

const ComplainPageAdmin = () => {

    document.title = 'Complain';

    const [contact, setContact] = useState();
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])

    const [state, dispatch] = useContext(UserContext)


    const maxWord = (word) => {
        return word.length >= 25 ? word.substring(0, 25) + "..." : word;
    }

    // initial variable outside component
    let socket;

    const loadContacts = () => {
        socket.emit("load customer contact")

        socket.on("customer contacts", (data) => {
            console.log(data, "ini data kontak")

            let dataContacts = data.filter(item => (item.status !== 'admin') && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))

            dataContacts = dataContacts.map(item => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].message : "Click here to start the chat"
            }))

            setContacts([dataContacts])
            console.log(dataContacts)
        })
    }


    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token") // we must set options to get access to socket server
            },
            query: {
                id: state.user.id
            }
        })

        // define corresponding socket listener 
        socket.on("new message", () => {
            console.log("contact", contact)
            console.log("triggered", contact?.id)
            socket.emit("load messages", contact?.id)
        })

        // listen error sent from server
        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });

        loadContacts()
        loadMessages()


        return () => {
            socket.disconnect()
        }
    }, [messages])

    const onClickContact = (data) => {
        setContact(data)
        console.log(data, "ada datanya gasi")
        socket.emit("load messages", data.id)
    }

    const loadMessages = (value) => {
        socket.on("message", (data) => {
            const dataMessage = data.map(item => ({
                idSender: item.sender.id,
                message: item.message
            }))
            console.log(dataMessage)
            setMessages(dataMessage)
        })
        loadContacts()
        const chatMessages = document.getElementById("chat-messages")
        // chatMessages.scrollTop = chatMessages?.scrollHeight
    }

    const onSendMessage = (e) => {
        if (e.key === "Enter") {
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            socket.emit("send messages", data)
            e.target.value = ""
        }
    }

    return (
        <>
            <NavbarComponent />
            <Container>
                <Row>
                    <Col md={3}>
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9}>
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ComplainPageAdmin