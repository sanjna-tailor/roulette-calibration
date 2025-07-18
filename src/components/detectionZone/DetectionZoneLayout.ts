import { LINE_JOIN } from 'pixi.js';
import { IDetectionZoneLayout } from './DetectionZoneComponent';

export const DetectionZoneLayout: IDetectionZoneLayout = {
	selector: 'detectionZone',
	eventMode: 'static',
	cursor: 'pointer',
	//height: 50,
	//width: 100,
	maxRadius: 200,
	minRadius: 50,
	centerColor: 0x00ffff,
	minColor: 0x00ffff,
	maxColor: 0x00ffff,
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
