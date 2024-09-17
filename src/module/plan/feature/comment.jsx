/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

const CommentForm = () => {
  const [name] = useState("محمدی");
  const [comment, setComment] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showName, setShowName] = useState(true); // New state for controlling name display

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && name.trim()) {
      setChatHistory([
        ...chatHistory,
        { sender: "user", name: showName ? name : "ناشناس", message: comment }
      ]);
      setComment("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">نظرات</h1>
      
      <div className="mb-4">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`chat ${
              chat.sender === "user" ? "chat-start" : "chat-end"
            }`}
          >
            <div
              className={`chat-bubble ${
                chat.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-900 text-white"
              }`}
            >
              <span className="font-bold">{chat.name}:</span> {chat.message}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  
        <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="پیام خود را وارد کنید..."
          rows="2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-name"
            checked={showName}
            onChange={() => setShowName(!showName)}
            className="mr-2"
          />
          <label htmlFor="show-name">نمایش نام</label>
        </div>

        <button
          type="submit"
          className="  items-center  bg-gradient-to-r from-[#004ff9] to-[#000000] text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
