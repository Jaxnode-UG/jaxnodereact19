"use client";
import { useOptimistic, useRef, useState } from "react";
import { deliverMessage } from "../app/actions/delivermessage";

export default function ThreadWrapper() {
  const [messages, setMessages] = useState([
    { text: "Hello there!", sending: false, key: 1 }
  ]);
  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message")?.valueOf() as string);
    setMessages((messages) => [...messages, { text: sentMessage, sending: false, key: messages.length + 1 }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}

interface ThreadProps {
  readonly messages: { readonly text: string; readonly sending: boolean }[];
  readonly sendMessage: (formData: FormData) => Promise<void>;
}

function Thread({ messages, sendMessage }: ThreadProps) {
  const formRef = useRef<HTMLFormElement>(null);
  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message"));
    formRef.current?.reset();
    await sendMessage(formData);
  }
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage as string,
        sending: true
      }
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
