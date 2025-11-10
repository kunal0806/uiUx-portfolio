// AI Bot Configuration and Logic
class AIBot {
  constructor() {
    this.isOpen = false;
    this.conversation = [];
    this.initializeBot();
    this.loadConversation();
  }

  initializeBot() {
    // Create bot HTML structure
    this.createBotHTML();

    // Add event listeners
    this.addEventListeners();

    // Show welcome message after a short delay
    setTimeout(() => {
      this.showWelcomeMessage();
    }, 1000);
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
                        <button class="ai-bot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="ai-bot-messages" id="aiBotMessages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="message-typing" id="typingIndicator">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <button class="quick-action" data-action="projects">View Projects</button>
                        <button class="quick-action" data-action="process">Design Process</button>
                        <button class="quick-action" data-action="contact">Get in Touch</button>
                        <button class="quick-action" data-action="about">About Jagriti</button>
                    </div>
                    
                    <div class="ai-bot-input">
                        <input type="text" id="aiBotInput" placeholder="Ask me about my work, projects, or process...">
                        <button class="ai-bot-send" id="aiBotSend">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", botHTML);

    // Store references to DOM elements
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
    // Toggle bot window
    this.elements.toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleWindow();
    });

    // Close bot window
    this.elements.close.addEventListener("click", () => this.closeWindow());

    // Send message on button click
    this.elements.send.addEventListener("click", () => this.sendMessage());

    // Send message on Enter key
    this.elements.input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });

    // Quick actions
    document.querySelectorAll(".quick-action").forEach((button) => {
      button.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");
        this.handleQuickAction(action);
      });
    });

    // Close bot when clicking outside (only on mobile)
    if (this.isMobile()) {
      document.addEventListener("click", (e) => {
        if (this.isOpen && !e.target.closest(".ai-bot-container")) {
          this.closeWindow();
        }
      });
    }

    // Handle window resize
    window.addEventListener("resize", () => this.handleResize());
  }

  isMobile() {
    return window.innerWidth <= 768;
  }

  handleResize() {
    if (this.isMobile() && this.isOpen) {
      // Adjust window position for mobile
      this.elements.window.style.right = "0";
      this.elements.window.style.width = "calc(100vw - 40px)";
    }
  }

  toggleWindow() {
    this.isOpen = !this.isOpen;
    this.elements.window.classList.toggle("active", this.isOpen);

    // Hide notification dot when opened
    if (this.isOpen) {
      document.querySelector(".notification-dot").style.display = "none";
      this.elements.input.focus();

      // Show hello animation
      this.showHelloAnimation();

      // Adjust for mobile
      if (this.isMobile()) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (this.isMobile()) {
        document.body.style.overflow = "";
      }
    }
  }

  showHelloAnimation() {
    this.elements.helloAnimation.style.display = "block";
    setTimeout(() => {
      this.elements.helloAnimation.style.display = "none";
    }, 2000);
  }

  closeWindow() {
    this.isOpen = false;
    this.elements.window.classList.remove("active");
    if (this.isMobile()) {
      document.body.style.overflow = "";
    }
  }

  showWelcomeMessage() {
    const welcomeMessage =
      "Hi! I'm Jagriti's AI assistant. I can help you explore her portfolio, projects, and design process. What would you like to know?";
    this.addMessage(welcomeMessage, "bot");
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    // Format the text with proper HTML for line breaks and lists
    const formattedText = this.formatMessage(text);
    messageDiv.innerHTML = formattedText;

    this.elements.messages.appendChild(messageDiv);
    this.scrollToBottom();

    // Add to conversation history
    this.conversation.push({ sender, text, timestamp: new Date() });
    this.saveConversation();
  }

  formatMessage(text) {
    // Replace line breaks with <br>
    let formatted = text.replace(/\n/g, "<br>");

    // Format bullet points
    formatted = formatted.replace(
      /•\s*(.*?)(?=<br>|$)/g,
      '<span class="bullet-point">• $1</span>',
    );

    // Format numbered lists
    formatted = formatted.replace(
      /(\d+)\.\s*(.*?)(?=<br>|$)/g,
      '<span class="numbered-item"><span class="number">$1.</span> $2</span>',
    );

    return formatted;
  }

  showTypingIndicator() {
    this.elements.typing.classList.add("active");
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    this.elements.typing.classList.remove("active");
  }

  scrollToBottom() {
    setTimeout(() => {
      this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }, 100);
  }

  sendMessage() {
    const message = this.elements.input.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, "user");
    this.elements.input.value = "";

    // Show typing indicator
    this.showTypingIndicator();

    // Process message and generate response
    setTimeout(
      () => {
        this.generateResponse(message);
        this.hideTypingIndicator();
      },
      1000 + Math.random() * 1000,
    );
  }

  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    let response = "";

    // Simple response logic based on keywords
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      response =
        "Hello! I'm here to help you explore Jagriti's portfolio. You can ask me about her projects, design process, or experience.";
    } else if (message.includes("project") || message.includes("work")) {
      response = `Jagriti has worked on several exciting projects including:

• 101 Healthcare Website - UX research and visual design
• MapleCode Innovations - Complete UX/UI design  
• Campaigns by Source Digital - Ad scheduling system

You can view all projects in the 'Work' section or use the quick action buttons above.`;
    } else if (
      message.includes("process") ||
      message.includes("design process")
    ) {
      response = `Jagriti follows a structured 4-step design process:

1. DISCOVER - Research and understand user needs
2. DEFINE - Synthesize insights and define problems
3. DREAM - Brainstorm creative solutions
4. DESIGN - Create wireframes and final designs
5. DEVELOP -  Work closely with developers to ensure smooth handoff
6. DELIVER - Final product delivers on both user and business goals

You can learn more in the 'Process' section of her portfolio.`;
    } else if (message.includes("experience") || message.includes("year")) {
      response =
        "Jagriti has 5+ years of experience in UX/UI design across healthcare, ad tech, and digital platforms. She's completed 50+ projects with 100% client satisfaction.";
    } else if (
      message.includes("contact") ||
      message.includes("get in touch")
    ) {
      response = `You can contact Jagriti through:

• The contact form on her website
• LinkedIn profile
• Email

Use the 'Get in Touch' quick action above or visit the Contact page.`;
    } else if (message.includes("about") || message.includes("jagriti")) {
      response =
        "Jagriti Sood is a UX/UI designer who turns complex systems into simple, human-centered interfaces. Beyond design, she enjoys crafting hand-poured candles - another form of creative expression!";
    } else if (message.includes("skill") || message.includes("expert")) {
      response = `Jagriti's expertise includes:

• UX Research & Strategy
• Wireframing & Prototyping
• Visual UI Design
• Interaction Design
• User Testing & Handoff

She specializes in creating digital tools that are both functional and beautiful.`;
    } else {
      response = `I'm not sure I understand. You can ask me about:
• Jagriti's projects and work
• Her design process
• Professional experience
• How to contact her
• Or use the quick action buttons above for specific topics.`;
    }

    this.addMessage(response, "bot");
  }

  handleQuickAction(action) {
    let message = "";

    switch (action) {
      case "projects":
        message = "Tell me about Jagriti's projects";
        break;
      case "process":
        message = "What is Jagriti's design process?";
        break;
      case "contact":
        message = "How can I contact Jagriti?";
        break;
      case "about":
        message = "Tell me about Jagriti";
        break;
    }

    if (message) {
      this.elements.input.value = message;
      this.sendMessage();
    }
  }

  saveConversation() {
    try {
      localStorage.setItem(
        "aiBotConversation",
        JSON.stringify(this.conversation),
      );
    } catch (e) {
      console.log("Could not save conversation:", e);
    }
  }

  loadConversation() {
    try {
      const saved = localStorage.getItem("aiBotConversation");
      if (saved) {
        this.conversation = JSON.parse(saved);
      }
    } catch (e) {
      console.log("Could not load conversation:", e);
    }
  }
}

// Initialize AI Bot when DOM is loaded
function initAIBot() {
  // Only initialize if the bot container doesn't exist
  if (!document.querySelector(".ai-bot-container")) {
    window.aiBot = new AIBot();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAIBot);
} else {
  initAIBot();
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AIBot, initAIBot };
}
