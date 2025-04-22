import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <div class="chat-header">
        <h2>AI Assistant</h2>
        <p class="subtitle">Ask me anything about job searching, career advice, or interview tips!</p>
      </div>
      
      <div class="chat-messages" #chatMessages>
        <div *ngFor="let message of messages" [class]="'message ' + message.role">
          <div class="message-content" [innerHTML]="formatMessage(message.content)"></div>
          <div class="message-time">{{ message.timestamp | date:'shortTime' }}</div>
        </div>
        <div *ngIf="isLoading" class="message assistant">
          <div class="message-content typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <input 
          type="text" 
          [(ngModel)]="userInput" 
          (keyup.enter)="sendMessage()"
          placeholder="Type your message..."
          [disabled]="isLoading"
        />
        <button 
          (click)="sendMessage()" 
          [disabled]="isLoading || !userInput.trim()"
        >
          {{ isLoading ? 'Sending...' : 'Send' }}
        </button>
      </div>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 64px);
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
    }

    .chat-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .chat-header h2 {
      color: #333;
      margin-bottom: 5px;
    }

    .subtitle {
      color: #666;
      font-size: 0.9rem;
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .message {
      margin-bottom: 15px;
      padding: 10px 15px;
      border-radius: 8px;
      max-width: 70%;
      position: relative;
    }

    .message.user {
      background: #007bff;
      color: white;
      margin-left: auto;
    }

    .message.assistant {
      background: #e9ecef;
      color: #212529;
      margin-right: auto;
    }

    .message-time {
      font-size: 0.7rem;
      opacity: 0.7;
      margin-top: 5px;
    }

    .message.user .message-time {
      color: rgba(255, 255, 255, 0.7);
    }

    .message.assistant .message-time {
      color: rgba(0, 0, 0, 0.7);
    }

    .chat-input {
      display: flex;
      gap: 10px;
      padding: 10px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input:disabled {
      background: #f5f5f5;
    }

    button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background: #0056b3;
    }

    .error-message {
      color: #dc3545;
      text-align: center;
      margin-top: 10px;
      padding: 10px;
      background: #f8d7da;
      border-radius: 4px;
    }

    .typing-indicator {
      display: flex;
      gap: 5px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      background: #666;
      border-radius: 50%;
      animation: typing 1s infinite;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .message-content {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .message-content strong {
      font-weight: bold;
    }
    .message-content em {
      font-style: italic;
    }
    .message-content ul {
      list-style-type: disc;
      padding-left: 20px;
      margin: 10px 0;
    }
    .message-content li {
      margin-bottom: 5px;
    }
  `]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;
  
  messages: { role: 'user' | 'assistant', content: string, timestamp: Date }[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private geminiService: GeminiService) {}

  ngOnInit() {
    // Add welcome message
    this.messages.push({
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you with your job search or career today?',
      timestamp: new Date()
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch(err) { }
  }

  formatMessage(content: any): string {
    // Convert content to string if it's not already
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    
    // Convert markdown-style formatting to HTML
    return contentStr
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br>') // Line breaks
      .replace(/\*   (.*?)\n/g, '<li>$1</li>') // List items
      .replace(/\n\n/g, '<br><br>'); // Double line breaks
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage = this.userInput.trim();
    this.userInput = '';
    this.isLoading = true;
    this.error = null;

    // Add user message
    this.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Get AI response
    this.geminiService.getGeminiResponse({ message: userMessage }).subscribe({
      next: (response) => {
        // Extract the reply from the response object
        const messageContent = response.reply || response.message || response;
        
        this.messages.push({
          role: 'assistant',
          content: messageContent,
          timestamp: new Date()
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Sorry, there was an error processing your request. Please try again.';
        this.isLoading = false;
        console.error('Chat error:', err);
      }
    });
  }
}
