// import { useEffect, useState } from "react";

// const useWebSocket = () => {
//   const [data, setData] = useState({ t: 20, h: 50, v: 3.7, x: 0, y: 0, z: 0 });
//   const [isConnected, setIsConnected] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setData({
//         t: Math.random() * 30,
//         h: Math.random() * 100,
//         v: Math.random() * 10,
//         x: Math.sin(Date.now() / 1000),
//         y: Math.cos(Date.now() / 1000),
//         z: Math.sin(Date.now() / 2000),
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return { data, isConnected };
// };

// export default useWebSocket;  //randomni datalar

import { useEffect, useState } from "react";

const useWebSocket = () => {
  const [data, setData] = useState({ t: 20, h: 50, v: 3.7, x: 0, y: 0, z: 0 });
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const mockWebSocketConnection = () => {
      const ws = new WebSocket("wss://your-websocket-server-url");

      ws.onopen = () => {
        setIsConnected(true);
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const incomingData = JSON.parse(event.data);
        setData(incomingData);
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log("WebSocket disconnected");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return ws;
    };

    const ws = mockWebSocketConnection();

    return () => {
      ws.close();
    };
  }, []);

  return { data, isConnected };
};

export default useWebSocket;
