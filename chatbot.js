(function () {
  // Default configuration
  const defaultConfig = {
    webhookUrl: 'http://localhost:5678/webhook/d931c4a7-02f5-4359-918f-7ad3fae7b144/chat',
    title: 'Salus Disability',
    welcomeMessage: 'Hi There! Would you like a free Social Security consultation?',
    position: 'bottom-right',
    primaryColor: '#f56447',
    secondaryColor: '#E4AE20'
  };

  // Create and inject styles
  const style = document.createElement('style');
  style.textContent = `
    #salus-chat-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--secondary-color, #E4AE20), var(--primary-color, #F56447));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      z-index: 9999;
      font-size: 28px;
      color: white;
    }

    #salus-chat-launcher svg {
      width: 28px;
      height: 28px;
      fill: white;
    }

    #salus-chat-launcher .close-icon {
      display: none;
      font-size: 32px;
      line-height: 1;
    }

    #salus-chat-window {
      position: fixed;
      bottom: 96px;
      right: 16px;
      width: 100%;
      max-width: 650px;
      min-width: 320px;
      height: 100%;
      max-height: 650px;
      min-height: 400px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 16px 32px rgba(0,0,0,0.25);
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: sans-serif;
      z-index: 9998;
    }

    #salus-chat-header {
      background: #fff;
      border-bottom: 1px solid #eee;
      padding: 12px 16px;
      display: flex;
      align-items: center;
    }

    #salus-chat-header h2 {
      font-size: 16px;
      margin: 0;
      flex: 1;
    }

    #salus-chat-close {
      background: none;
      border: none;
      font-size: 28px;
      font-weight: bold;
      cursor: pointer;
      color: #aaa;
      padding: 4px 8px;
      line-height: 1;
    }

    #salus-chat-body {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .salus-chat-message {
      margin-bottom: 8px;
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 16px;
      line-height: 1.4;
      font-size: 14px;
    }

    .salus-chat-message.user {
      align-self: flex-end;
      background: var(--primary-color, #ef7f3a);
      color: white;
    }

    .salus-chat-message.bot {
      align-self: flex-start;
      background: #f0f0f0;
      color: #333;
    }

    .salus-chat-message.bot a {
      color: #0066cc;
      text-decoration: underline;
      word-break: break-word;
    }

    .salus-chat-message.bot p,
    .salus-chat-message.bot ul,
    .salus-chat-message.bot ol,
    .salus-chat-message.bot li {
      margin: 0;
      padding: 0;
      line-height: 1.35;
    }

    .salus-chat-message.bot p + p {
      margin-top: 0.4em;
    }

    .salus-chat-message.bot ul,
    .salus-chat-message.bot ol {
      margin-left: 1em;
    }

    #salus-chat-input-container {
      display: flex;
      border-top: 1px solid #eee;
    }

    #salus-chat-input {
      flex: 1;
      padding: 14px;
      border: none;
      outline: none;
      font-size: 16px;
    }

    #salus-chat-send {
      background: var(--primary-color, #f56447);
      border: none;
      color: white;
      padding: 0 20px;
      font-size: 16px;
      cursor: pointer;
    }

    #salus-chat-send:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .salus-typing-indicator {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 4px;
    }

    .salus-typing-indicator span {
      width: 8px;
      height: 8px;
      background-color: #999;
      border-radius: 50%;
      animation: salus-bounce 1.4s infinite ease-in-out both;
    }

    .salus-typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .salus-typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
    .salus-typing-indicator span:nth-child(3) { animation-delay: 0; }

    @keyframes salus-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    @media (max-width: 640px) {
      #salus-chat-window {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        max-height: none !important;
        min-width: 100vw !important;
        min-height: 100vh !important;
        border-radius: 0 !important;
        z-index: 10001 !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Create widget HTML
  const widgetHTML = `
    <div id="salus-chat-launcher" aria-label="Open chat">
      <svg class="chat-icon" viewBox="0 0 24 24"><path d="M12 3C6.486 3 2 6.589 2 11c0 1.905.812 3.661 2.174 5.07L2 21l5.137-1.63A11.35 11.35 0 0 0 12 19c5.514 0 10-3.589 10-8s-4.486-8-10-8Z"/></svg>
      <span class="close-icon">&times;</span>
    </div>

    <div id="salus-chat-window">
      <div id="salus-chat-header">
        <h2></h2>
        <button id="salus-chat-close">&times;</button>
      </div>
      <div id="salus-chat-body"></div>
      <div id="salus-chat-input-container">
        <input id="salus-chat-input" placeholder="Type a message..." />
        <button id="salus-chat-send" disabled>Send</button>
      </div>
    </div>
  `;

  // Create container and inject HTML
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container);

  // Initialize widget
  window.initSalusChat = function (config = {}) {
    const finalConfig = { ...defaultConfig, ...config };

    // Set CSS variables
    document.documentElement.style.setProperty('--primary-color', finalConfig.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', finalConfig.secondaryColor);

    const sessionId = crypto.randomUUID();
    sessionStorage.setItem('salus_chatbot_session_id', sessionId);

    const launcher = document.getElementById('salus-chat-launcher');
    const chatWindow = document.getElementById('salus-chat-window');
    const closeBtn = document.getElementById('salus-chat-close');
    const sendBtn = document.getElementById('salus-chat-send');
    const inputField = document.getElementById('salus-chat-input');
    const chatBody = document.getElementById('salus-chat-body');
    const chatTitle = document.querySelector('#salus-chat-header h2');

    const chatIcon = launcher.querySelector('.chat-icon');
    const closeIcon = launcher.querySelector('.close-icon');

    chatTitle.textContent = finalConfig.title;
    let initialized = false;

    launcher.onclick = () => {
      const isOpen = chatWindow.style.display === 'flex';
      const nowOpen = !isOpen;

      chatWindow.style.display = nowOpen ? 'flex' : 'none';

      if (nowOpen) {
        inputField.focus();
        chatIcon.style.display = 'none';
        closeIcon.style.display = 'block';

        if (!initialized) {
          appendMarkdownMessage(finalConfig.welcomeMessage, 'bot');
          initialized = true;
        }
      } else {
        chatIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    };

    closeBtn.onclick = () => {
      chatWindow.style.display = 'none';
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    };

    function updateSendButtonState() {
      sendBtn.disabled = inputField.value.trim() === '';
    }

    inputField.addEventListener('input', updateSendButtonState);
    document.addEventListener('DOMContentLoaded', updateSendButtonState);

    function appendMarkdownMessage(text, sender) {
      const msg = document.createElement('div');
      msg.className = 'salus-chat-message ' + sender;
      const safeText = typeof text === 'string' ? text.trim() : JSON.stringify(text);
      msg.innerHTML = marked.parse(safeText);
      msg.querySelectorAll('a').forEach(a => {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      });
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
      return msg;
    }

    function appendTypingIndicator() {
      const msg = document.createElement('div');
      msg.className = 'salus-chat-message bot';
      msg.setAttribute('data-typing', 'true');

      const typing = document.createElement('div');
      typing.className = 'salus-typing-indicator';

      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typing.appendChild(dot);
      }

      msg.appendChild(typing);
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
      return msg;
    }

    function removeTypingIndicator() {
      const typingEl = chatBody.querySelector('[data-typing]');
      if (typingEl) chatBody.removeChild(typingEl);
    }

    function appendUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'salus-chat-message user';
      msg.textContent = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    async function sendMessage() {
      const text = inputField.value.trim();
      if (!text) return;

      appendUserMessage(text);
      inputField.value = '';
      updateSendButtonState();
      appendTypingIndicator();

      try {
        const res = await fetch(finalConfig.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chatInput: text,
            sessionId: sessionId
          })
        });

        const data = await res.json();
        removeTypingIndicator();
        appendMarkdownMessage(
          data?.output?.toString?.() || 'No response from bot.',
          'bot'
        );
      } catch (err) {
        console.error('Chat error:', err);
        removeTypingIndicator();
        appendMarkdownMessage('Server error. Please try again later.', 'bot');
      }
    }

    sendBtn.onclick = sendMessage;
    inputField.addEventListener('keydown', e => {
      if (e.key === 'Enter') sendMessage();
    });
  };
})(); 