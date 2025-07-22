import { LINE_JOIN } from 'pixi.js';
import { ISliderLayout } from './SliderComponent';

export const SliderLayout: ISliderLayout = {
  selector: 'slider',
  eventMode: 'static',
  cursor: 'pointer',
  width: 300,
  height: 40,
  color: 0x000000,
  children: [
    {
      name: 'track',
      selector: 'graphics',
      shape: 'rect',
      color: '0x00ffff',
      alpha: 0,
    },
    {
      name: 'knob',
      selector: 'graphics',
      shape: 'circle',
      color: '0xffffff',
      alpha: 0,
    },
  ],
};
