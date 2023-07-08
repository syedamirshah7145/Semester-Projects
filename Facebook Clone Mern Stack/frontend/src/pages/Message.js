import React, { useEffect, useState } from "react";

const Message = () => {
    const [refresh,setRefresh] = useState(false);
    const [message,setMessage] = useState("");
    const [friends, setFriends] = useState([]);
    const [activeFriend, setActiveFriend] = useState("")
    const [activeConversation, setActiveConversation] = useState("")
    const localData = JSON.parse(localStorage.getItem("user"))
    const userId = localData._id

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/friends/${userId}`)
                const json = await response.json()
                setFriends(json.friends)

            }
            catch (error) {
                console.log(error)
            }
        }
        fetchFriends()
    }, [])

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const friendId = activeFriend;
                console.log(friendId)

                const response = await fetch(`http://localhost:5000/api/conversation/${userId}/${friendId}`);
                const json = await response.json();
                setActiveConversation(json)
                console.log(json)
            }
            catch (err) {
                console.log(err)
            }

        }
        fetchConversation()
        setRefresh(false)
    },[activeFriend,refresh])

    if (!friends) return "Loading"

    const handleClick = (friendId) => {
        setActiveFriend(friendId)
    }

    const handleSend = () => {
        try{
            const createMessage = async() => {
                const response = await fetch('http://localhost:5000/api/createmessage',{
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({senderId:userId,receiverId:activeFriend,content:message})
                })
                const json = await response.json()
                setMessage("")
            }
            setRefresh(true)
            createMessage()  
        }
        catch(error){
            console.log(error)
        }
        
    }



    return (
        <section className="gradient-custom">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 col-lg-5 col-xl-5 mb-4 mb-md-0">
                        <h5 className="font-weight-bold mb-3 text-center text-white">Member</h5>
                        <div style={{ background: "rgba(24, 24, 16, .2)", borderRadius: "2em", backdropFilter: "blur(15px)", border: "2px solid rgba(255, 255, 255, 0.05)", backgroundClip: "padding-box", boxShadow: "10px 10px 10px rgba(46, 54, 68, 0.03)" }} className="card mask-custom">


                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    {friends.map(friend => (
                                        <li onClick={() => handleClick(friend._id)} className="p-2 border-bottom" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }}>
                                            <a href="#!" className="d-flex justify-content-between link-light">
                                                <div className="d-flex flex-row">
                                                    <img src={friend.profilePicture} alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0">{friend.name}</p>
                                                        <p className="small text-white">{friend.bio}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-1">
                                                    <p className="small text-white mb-1">{friend.location}</p>
                                                    <span className="badge bg-danger float-end">1</span>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-7 col-xl-7">

                        <ul className="list-unstyled text-white">

                        {activeConversation.length>0 && activeConversation.map((conversation) => (
                            <li className="d-flex justify-content-between mb-4">
                                <img src={conversation.senderId.profilePicture} alt="avatar"
                                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                                <div className="card mask-custom" style={{ background: "rgba(24, 24, 16, .2)", borderRadius: "2em", backdropFilter: "blur(15px)", border: "2px solid rgba(255, 255, 255, 0.05)", backgroundClip: "padding-box", boxShadow: "10px 10px 10px rgba(46, 54, 68, 0.03)" }}>
                                    <div className="card-header d-flex justify-content-between p-3"
                                        style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}>
                                        <p className="fw-bold mb-0">{conversation.senderId.name}</p>
                                        <p className="ps-2 text-light small mb-0"><i className="far fa-clock"></i>{new Date(conversation.timestamp).toLocaleString()}</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                            {conversation.content}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                            <li className="mb-3">
                                <div className="form-outline form-white">
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" id="textAreaExample3" rows="4"></textarea>
                                    <label className="form-label" htmlFor="textAreaExample3">Message</label>
                                </div>
                            </li>
                            <li>
                                <button onClick={handleSend} type="button" className="btn btn-primary btn-rounded btn-sm px-3">Send</button>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default Message
