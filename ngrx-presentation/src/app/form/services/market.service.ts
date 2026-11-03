import { DOCUMENT, inject, Injectable } from '@angular/core';
import { interval, Observable, scan } from 'rxjs';

/**
 * Mock of the NGP Coin market
 */
@Injectable({ providedIn: 'root' })
export class MarketService {
  private document = inject(DOCUMENT);

  public readonly quotes$: Observable<number> = interval(1000).pipe(
    scan((price) => price + (Math.random() - 0.5) / 10, 10),
  );

  /**
   * Places an order and celebrates it with a fanfare
   */
  public order(): void {
    this._playSound();
    this._confetti();
  }

  /**
   * Plays a cheesy "ta-da" made of four square wave notes
   */
  private _playSound(): void {
    const audio = new AudioContext();
    const notes = [523, 659, 784, 1047];

    notes.forEach((frequency, index) => {
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      const start = audio.currentTime + index * 0.12;
      const end = start + (index === notes.length - 1 ? 0.8 : 0.12);

      oscillator.type = 'square';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.1, start);
      gain.gain.exponentialRampToValueAtTime(0.001, end);

      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(end);
    });
  }

  /**
   * Rains emojis over the whole screen
   */
  private _confetti(): void {
    const emojis = ['🎉', '🪙', '🚀', '✨', '🥳'];

    for (let i = 0; i < 50; i++) {
      const piece = this.document.createElement('span');

      piece.textContent = emojis[i % emojis.length];
      piece.style.cssText = `position: fixed; top: -3rem; left: ${Math.random() * 100}vw; font-size: 2rem; pointer-events: none; z-index: 50;`;
      this.document.body.append(piece);

      piece
        .animate(
          [
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)` },
          ],
          { duration: 1500 + Math.random() * 1500, delay: Math.random() * 400, easing: 'ease-in' },
        )
        .finished.then(() => piece.remove());
    }
  }
}
