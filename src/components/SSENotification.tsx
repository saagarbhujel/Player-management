import { useEffect, useState } from "react";
import { useToast } from "../hooks/useToast";

let ready = false;
const SSENotification = () => {
  const [eventSource, setEventSource] = useState<EventSource>();
  const { setToast } = useToast();

  const connet = () => {
    const eventSource = new EventSource("http://localhost:8080/sse/event");
    console.log(eventSource, "eventSource");
    setEventSource(eventSource);

    eventSource.onopen = () => {
      console.log("Connection Opened");
    };
    eventSource.onmessage = (e) => {
      console.log(e.data);
      const msg = e.data;
      setToast(msg, "success", "score");
    };
  };

  if (!ready) {
    connet();
    ready = true;
  }

  useEffect(() => {
    if (eventSource?.readyState === 2) {
      connet();
    }
  }, [eventSource?.readyState]);

  return null;
};

export default SSENotification;
