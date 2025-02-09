interface HelloResponse {
  message: string;
  timestamp: string;
}

class HelloService {
  getHelloMessage(): HelloResponse {
    return {
      message: 'Hello',
      timestamp: new Date().toISOString()
    };
  }
}

export default new HelloService();
