import { LINE_JOIN } from 'pixi.js';
import { ISquareFrameLayout } from './SquareFrameComponent';

export const SquareFrameLayout: ISquareFrameLayout = {
	selector: 'squareFrame',
	eventMode: 'static',
	cursor: 'pointer',
	//height: 50,
	//width: 100,
	sideLength: 100,
	color: 0x00ffff,
	children: [
		{
			name: 'hoverTop',
			selector: 'graphics',
			shape: 'rect',
			color: '0xffffff',
			// width: 100,
			// height: 5,
			// x: -50,
			// y: -50,
			pivot: { x: .5, y: 10.5 },
			alpha: 0,
		},
		{
			name: 'hoverLeft',
			selector: 'graphics',
			shape: 'rect',
			color: '0xffffff',
			pivot: { x: 10.5, y: .5 },
			alpha: 0,
		},
		{
			name: 'hoverBottom',
			selector: 'graphics',
			shape: 'rect',
			color: '0xffffff',
			pivot: { x: .5, y: -9.5 },
			alpha: 0,
		},
		{
			name: 'hoverRight',
			selector: 'graphics',
			shape: 'rect',
			color: '0xffffff',
			pivot: { x: -9.5, y: .5 },
			alpha: 0,
		},
	],
};
