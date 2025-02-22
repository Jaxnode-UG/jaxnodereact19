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
  readonly messages: { readonly text: string; readonly sending: boolean, readonly key: number }[];
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
        sending: true,
        key: state.length + 1
      }
    ]
  );

  return (
    <div className="flex flex-col gap-2">
      {optimisticMessages.map((message) => (
        <div key={message.key}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef} className="flex flex-col gap-2 max-w-xs">
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit" className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white">Send</button>
      </form>
    </div>
  );
}
