import { ref, onUnmounted } from 'vue';

export function useWebSocket(url: string) {
  const socket = new WebSocket(url);
  const data = ref<any>(null);
  const isConnected = ref(false);

  socket.onopen = () => {
    console.log('WebSocket 연결 성공');
    isConnected.value = true;
  };

  socket.onmessage = (event) => {
    // 백엔드에서 보낸 JSON 데이터를 파싱하여 저장
    data.value = JSON.parse(event.data);
  };

  socket.onclose = () => {
    console.log('WebSocket 연결 종료');
    isConnected.value = false;
  };

  socket.onerror = (error) => {
    console.error('WebSocket 에러:', error);
  };

  // 컴포넌트가 없어질 때 연결 종료 (메모리 누수 방지)
  onUnmounted(() => {
    socket.close();
  });

  // 외부로 데이터와 상태를 노출
  return { data, isConnected };
}