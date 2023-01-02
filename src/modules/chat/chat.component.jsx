import React, { useState, useEffect } from "react";
import { ChatBubble, BubbleGroup, Message } from "react-chat-ui";

const users = {
  0: "You",
  Mark: "Mark",
  2: "Evan",
};

const chatApp = () => {
  const [message, setMessage] = useState();

  const onMessageSubmit = () => {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = "";
    return true;
  };
};

const pushMessage = (recipient, message) => {
  const prevState = this.state;
  const newMessage = new Message({
    id: recipient,
    message,
    senderName: users[recipient],
  });
  prevState.messages.push(newMessage);
  this.setState(this.state);
};

const onPress = (user) => {
    this.setState({ curr_user: user });
  }

return (
  <div className="container">
    <BubbleGroup
      messages={[
        new Message({ id: 1, message: "Hey!" }),
        new Message({ id: 1, message: "I forgot to mention..." }),
        new Message({
          id: 1,
          message:
            "Oh no, I forgot... I think I was going to say I'm a BubbleGroup",
        }),
      ]}
      id={1}
      showSenderName={true}
      senderName={"Elon Musk"}
    />
    <ChatBubble
      message={new Message({ id: 2, message: "I 'm a single ChatBubble!" })}
    />
    <BubbleGroup
      messages={[
        new Message({ id: 0, message: "How could you forget already?!" }),
        new Message({
          id: 0,
          message: "Oh well. I'm a BubbleGroup as well",
        }),
      ]}
      id={1}
      showSenderName={true}
      senderName={"Elon Musk"}
    />
  </div>
);

// class Chat extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       messages: [
//         new Message({ id: "Mark", message: "Hey guys!", senderName: "Mark" }),
//         new Message({
//           id: 2,
//           message: "Hey! Evan here. react-chat-ui is pretty dooope.",
//           senderName: "Evan",
//         }),
//       ],
//       useCustomBubble: false,
//       curr_user: 0,
//     };
//   }


//   render() {}
// }

export default chatApp;
