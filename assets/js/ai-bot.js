// AI Bot Configuration and Logic
class AIBot {
  constructor() {
    this.isOpen = false;
    this.conversation = [];
    this.elements = {};
    this.initializeBot();
    this.loadConversation();
  }

  initializeBot() {
    this.createBotHTML();
    this.cacheElements();
    this.addEventListeners();

    // Auto-welcome only once per page load
    setTimeout(() => this.showWelcomeMessage(), 800);
  }

  createBotHTML() {
    const botHTML = `
      <div class="ai-bot-container">
        <button class="ai-bot-toggle">
          <i class="fas fa-robot"></i>
          <div class="notification-dot"></div>
        </button>

        <div class="ai-bot-window">
          <div class="texture-bg"></div>
          <div class="hello-animation">Hello! I'm Jagriti's AI assistant</div>

          <div class="ai-bot-header">
            <div class="ai-bot-title">
              <div class="female-avatar">
                <img src="./assets/images/about/my-pic.JPG" alt="Assistant Avatar" />
              </div>
              <span>Jagriti's AI assistant</span>
            </div>
            <button class="ai-bot-close"><i class="fas fa-times"></i></button>
          </div>

          <div class="ai-bot-messages" id="aiBotMessages"></div>

          <div class="message-typing" id="typingIndicator">
            <div class="typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>


          <div class="ai-bot-input">
            <input type="text" id="aiBotInput" placeholder="Ask me anything...">
            <button class="ai-bot-send" id="aiBotSend"><i class="fas fa-paper-plane"></i></button>
          </div>
          <div class="quick-actions">
            <button class="quick-action" data-action="projects">View Projects</button>
            <button class="quick-action" data-action="process">Design Process</button>
            <button class="quick-action" data-action="contact">Get in Touch</button>
            <button class="quick-action" data-action="about">About Jagriti</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", botHTML);
  }

  cacheElements() {
    this.elements = {
      toggle: document.querySelector(".ai-bot-toggle"),
      window: document.querySelector(".ai-bot-window"),
      close: document.querySelector(".ai-bot-close"),
      messages: document.getElementById("aiBotMessages"),
      input: document.getElementById("aiBotInput"),
      send: document.getElementById("aiBotSend"),
      typing: document.getElementById("typingIndicator"),
      helloAnimation: document.querySelector(".hello-animation"),
    };
  }

  addEventListeners() {
    this.elements.toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleWindow();
    });

    this.elements.close.addEventListener("click", () => this.closeWindow());

    this.elements.send.addEventListener("click", () => this.sendMessage());

    this.elements.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    document.querySelectorAll(".quick-action").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.handleQuickAction(e.target.dataset.action),
      );
    });

    // Click outside to close (mobile only)
    document.addEventListener("click", (e) => {
      if (this.isMobile() && this.isOpen && !e.target.closest(".ai-bot-container")) {
        this.closeWindow();
      }
    });

    window.addEventListener("resize", () => this.handleResize());
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  handleResize() {
    if (this.isMobile() && this.isOpen) {
      this.elements.window.style.width = "100vw";
      this.elements.window.style.right = "0";
    }
  }

  toggleWindow() {
    this.isOpen = !this.isOpen;
    this.elements.window.classList.toggle("active", this.isOpen);

    if (this.isOpen) {
      document.querySelector(".notification-dot").style.display = "none";
      this.showHelloAnimation();
      if (this.isMobile()) document.body.style.overflow = "hidden";
      this.elements.input.focus();
    } else {
      if (this.isMobile()) document.body.style.overflow = "";
    }
  }

  closeWindow() {
    this.isOpen = false;
    this.elements.window.classList.remove("active");
    if (this.isMobile()) document.body.style.overflow = "";
  }

  showHelloAnimation() {
    const el = this.elements.helloAnimation;
    el.style.display = "block";
    setTimeout(() => (el.style.display = "none"), 1800);
  }

  showWelcomeMessage() {
    const msg = "Hi! I'm Jagriti's AI assistant. I can help you explore her portfolio, projects, and design process. What would you like to know?";
    this.addMessage(msg, "bot");
  }

  addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerHTML = this.formatMessage(text);

    this.elements.messages.appendChild(div);
    this.scrollToBottom();

    this.conversation.push({ sender, text, time: Date.now() });
    this.saveConversation();
  }

  formatMessage(text) {
    return text
      .replace(/\n/g, "<br>")
      .replace(/•\s*(.*?)(?=<br>|$)/g, '<span class="bullet">• $1</span>')
      .replace(/(\d+)\.\s*(.*?)(?=<br>|$)/g, '<span class="num">$1.</span> $2');
  }

  showTyping() {
    this.elements.typing.classList.add("active");
    this.scrollToBottom();
  }

  hideTyping() {
    this.elements.typing.classList.remove("active");
  }

  scrollToBottom() {
    setTimeout(() => {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }, 100);
  }

  sendMessage() {
    const msg = this.elements.input.value.trim();
    if (!msg) return;

    this.addMessage(msg, "user");
    this.elements.input.value = "";

    this.showTyping();

    setTimeout(() => {
      this.generateResponse(msg);
      this.hideTyping();
    }, 900 + Math.random() * 600);
  }

  generateResponse(userText) {
    const t = userText.toLowerCase();
    let reply = "";

    if (/hello|hi|hey/.test(t)) {
      reply = "Hello! Ask me anything about Jagriti's work or process.";
    } else if (t.includes("project")) {
      reply = `Here are some of Jagriti's projects:

• 101 Healthcare Website  
• MapleCode Innovations (UX/UI)  
• Source Digital Campaign Tools  

You can explore them in the Work section.`;
    } else if (t.includes("process")) {
      reply = `Jagriti follows a 6-step process:

1. Discover  
2. Define  
3. Dream  
4. Design  
5. Develop  
6. Deliver`;
    } else if (t.includes("experience")) {
      reply = "Jagriti has 5+ years of UX/UI experience across digital platforms.";
    } else if (t.includes("contact")) {
      reply = "You can contact Jagriti via her website, LinkedIn, or email.";
    } else if (t.includes("about") || t.includes("jagriti")) {
      reply = "Jagriti is a UX/UI designer who creates simple, human-centered digital experiences.";
    } else {
      reply = `I can help you with:

• Projects  
• Design Process  
• Experience  
• Contact details  
• About Jagriti`;
    }

    this.addMessage(reply, "bot");
  }

  handleQuickAction(type) {
    const map = {
      projects: "Tell me about Jagriti's projects",
      process: "What is Jagriti's design process?",
      contact: "How can I contact Jagriti?",
      about: "Tell me about Jagriti",
    };

    if (map[type]) {
      this.elements.input.value = map[type];
      this.sendMessage();
    }
  }

  saveConversation() {
    try {
      localStorage.setItem("aiBotConversation", JSON.stringify(this.conversation));
    } catch (e) {
      console.warn("Conversation not saved:", e);
    }
  }

  loadConversation() {
    try {
      const saved = localStorage.getItem("aiBotConversation");
      if (saved) this.conversation = JSON.parse(saved);
    } catch (e) {
      console.warn("Conversation load failed:", e);
    }
  }
}

// Initialize bot
function initAIBot() {
  if (!document.querySelector(".ai-bot-container")) {
    window.aiBot = new AIBot();
  }
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initAIBot)
  : initAIBot();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { AIBot, initAIBot };
}
