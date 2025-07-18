import { LINE_JOIN } from 'pixi.js';
import { ISensorZoneLayout } from './SensorZoneComponent';

export const SensorZoneLayout: ISensorZoneLayout = {
	selector: 'sensorZone',
	eventMode: 'static',
	cursor: 'pointer',
	height: 50,
	width: 100,
	// maxRadius: 200,
	// minRadius: 50,
	color: 0x00ffff,
	children: [
		{
			name: 'hover',
			selector: 'graphics',
			shape: 'rect',
			color: '0xffffff',
			width: 10,
			height: 10,
			pivot: { x: 5, y: 5 },
			alpha: 0,
		},
	],
};
