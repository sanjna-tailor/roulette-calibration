import * as PIXI from 'pixi.js';
import { AXContainer, GameComponent, IBaseGameComponentLayout } from '@sandsb2b/areax-pixi-core';
import { GameLayouts } from '../../types/GameLayouts';
import { SliderLayout } from './SliderLayout';

export interface ISliderLayout extends IBaseGameComponentLayout {
  selector: 'slider';
  width: number;
  height: number;
  color: PIXI.ColorSource;
  children?: GameLayouts[];
}

@GameComponent({
  selector: 'slider',
  layout: SliderLayout,
})
export class SliderComponent extends AXContainer {
  protected track: PIXI.Graphics;
  protected knob: PIXI.Graphics;
  private isDragging: boolean = false;
  private dragOffset: PIXI.Point | null = null;
  private sliderWidth: number = 200;
  private sliderHeight: number = 40;
  private knobRadius: number = 15;
  private trackColor: PIXI.ColorSource = 0x00ffff;
  private knobColor: PIXI.ColorSource = 0xffffff;

  protected onAdded(): void {
    this.track = new PIXI.Graphics();
    this.knob = new PIXI.Graphics();

    this.drawTrack();
    this.drawKnob();

    this.addChild(this.track);
    this.addChild(this.knob);

    (this.knob as any).interactive = true;
    (this.knob as any).cursor = 'pointer';

    (this.knob as any).on('pointerdown', (event: any) => {
      this.isDragging = true;
      const pointerPos = event.getLocalPosition(this);
      this.dragOffset = new PIXI.Point(pointerPos.x - this.knob.x, pointerPos.y - this.knob.y);
    });

    (this.knob as any).on('pointermove', (event: any) => {
      if (!this.isDragging || !this.dragOffset) return;
      const pointerPos = event.getLocalPosition(this);
      let newX = pointerPos.x - this.dragOffset.x;
      newX = Math.max(this.knobRadius, Math.min(newX, this.sliderWidth - this.knobRadius));
      this.knob.x = newX;
    });

    (this.knob as any).on('pointerup', () => {
      this.isDragging = false;
      this.dragOffset = null;
    });

    (this.knob as any).on('pointerupoutside', () => {
      this.isDragging = false;
      this.dragOffset = null;
    });
  }

  private drawTrack(): void {
    this.track.clear();
    this.track.lineStyle(4, this.trackColor);
    this.track.moveTo(this.knobRadius, this.sliderHeight / 2);
    this.track.lineTo(this.sliderWidth - this.knobRadius, this.sliderHeight / 2);
  }

  private drawKnob(): void {
    this.knob.clear();
    this.knob.beginFill(this.knobColor);
    this.knob.drawCircle(0, this.sliderHeight / 2, this.knobRadius);
    this.knob.endFill();
    this.knob.x = this.knobRadius;
    this.knob.y = 0;
  }

  set Width(val: number) {
    this.sliderWidth = val;
    this.drawTrack();
  }

  set Height(val: number) {
    this.sliderHeight = val;
    this.drawTrack();
    this.drawKnob();
  }

  set TrackColor(val: PIXI.ColorSource) {
    this.trackColor = val;
    this.drawTrack();
  }

  set KnobColor(val: PIXI.ColorSource) {
    this.knobColor = val;
    this.drawKnob();
  }
}
