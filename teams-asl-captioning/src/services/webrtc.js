class WebRTCService {
    constructor() {
      this.peerConnections = new Map();
      this.localStream = null;
      this.onParticipantJoinedCallback = null;
      this.onParticipantLeftCallback = null;
    }
  
    async initialize() {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        return this.localStream;
      } catch (error) {
        console.error('Failed to get local stream:', error);
        throw error;
      }
    }
  
    async createPeerConnection(participantId) {
      const configuration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:your-turn-server.com',
            username: 'username',
            credential: 'credential'
          }
        ]
      };
  
      const peerConnection = new RTCPeerConnection(configuration);
      
      this.localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, this.localStream);
      });
  
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // Send candidate to signaling server
          this.sendSignalingMessage({
            type: 'candidate',
            candidate: event.candidate,
            participantId
          });
        }
      };
  
      peerConnection.ontrack = (event) => {
        if (this.onParticipantJoinedCallback) {
          this.onParticipantJoinedCallback(participantId, event.streams[0]);
        }
      };
  
      this.peerConnections.set(participantId, peerConnection);
      return peerConnection;
    }
  
    async handleOffer(participantId, offer) {
      const peerConnection = await this.createPeerConnection(participantId);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      // Send answer to signaling server
      this.sendSignalingMessage({
        type: 'answer',
        answer,
        participantId
      });
    }
  
    async handleAnswer(participantId, answer) {
      const peerConnection = this.peerConnections.get(participantId);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    }
  
    async handleCandidate(participantId, candidate) {
      const peerConnection = this.peerConnections.get(participantId);
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    }
  
    sendSignalingMessage(message) {
      // Implement your signaling server communication here
      console.log('Sending signaling message:', message);
    }
  
    cleanup() {
      this.peerConnections.forEach((connection) => {
        connection.close();
      });
      this.peerConnections.clear();
      
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
      }
    }
  }
  
  export default new WebRTCService();