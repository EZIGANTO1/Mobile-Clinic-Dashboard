import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const [replyToEmail, setReplyToEmail] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

const openReplyModal = (email) => {
  setSelectedEmail(email);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setSelectedEmail("");
};

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:2025/api/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching messages");
      }
    };
    fetchMessages();
  }, []);

  const handleOpenModal = (email, name) => {
    setReplyToEmail(email);
    setReplyToName(name);
    setReplyMessage("");
    setShowModal(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:2025/api/message/reply",
        {
          email: selectedEmail,
          message: replyMessage,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message || "Reply sent successfully");
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reply");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                  <div className="details">
                        <p>First Name: <span>{element.firstName}</span></p>
                        <p>Last Name: <span>{element.lastName}</span></p>
                        <p>Email: <span>{element.email}</span></p>
                        <p>Phone Number: <span>{element.phoneNumber}</span></p>
                        <p>Message: <span>{element.message}</span></p>
    
                  <FiSend className="reply-icon" onClick={() => openReplyModal(element.email)} />
                  </div>
              </div>

            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Reply to: {selectedEmail}</h2>

  <textarea
  placeholder="Type your reply here..."
  value={replyMessage}
  onChange={(e) => setReplyMessage(e.target.value)}
  ></textarea>

      <div className="modal-actions">
        <button onClick={closeModal}>Cancel</button>

        <button onClick={handleSendReply}>Send</button>

      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default Messages;                                                                                   