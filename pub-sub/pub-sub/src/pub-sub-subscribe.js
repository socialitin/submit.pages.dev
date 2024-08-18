function subscribe() {
  const ws = new WebSocket('wss:https://pub-sub.socialitin.workers.dev/subscribe');
  ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (window.onMessageReceived) {
          window.onMessageReceived(data);
      } else {
          console.log('Received:', data.message);
      }
  };
  ws.onopen = () => {
      console.log('Subscribed to the channel');
  };
  ws.onclose = () => {
      console.log('Subscription closed');
  };
  ws.onerror = (error) => {
      console.error('WebSocket error:', error);
  };
}
