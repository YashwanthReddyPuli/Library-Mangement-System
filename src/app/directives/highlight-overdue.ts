import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOverdue]',
  standalone: true
})
export class HighlightOverdue implements OnChanges {
  @Input('appHighlightOverdue') isOverdue: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.isOverdue) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(139, 0, 0, 0.08)');
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid var(--royal-gold)');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'border-left');
    }

  }
}
