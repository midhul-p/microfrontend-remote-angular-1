import { Component, HostListener,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'micro-frontend-1';
  chatHistory = signal<string[]>([]);
  message = signal<string>('');

  sayHello() {
    const msg = 'MF1: Hello from micro-frontend-1';
    this.chatHistory.set([...this.chatHistory(), msg]);
    window.dispatchEvent(new CustomEvent('mf1-message', { detail: msg }));
  }

  sendMessage() {
    if (this.message().trim()) {
      const msg = `MF1: ${this.message()}`;
      this.chatHistory.set([...this.chatHistory(), msg]);
      window.dispatchEvent(new CustomEvent('mf1-message', { detail: msg }));
      this.message.set(''); // Clear input after sending
    }
  }

  @HostListener('window:mf2-message', ['$event'])
  receiveMessage(event: any) {
    this.chatHistory.set([...this.chatHistory(), event.detail]);
  }

  showInput() {
    return this.chatHistory().length > 0;
  }
  
}
