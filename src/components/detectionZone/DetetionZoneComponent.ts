import * as PIXI from 'pixi.js';
import { AXContainer, AXGraphics, GameComponent, IBaseGameComponentLayout } from '@sandsb2b/areax-pixi-core';
import { GameLayouts } from '../../types/GameLayouts';
import { DetectionZoneLayout } from './DetectionZoneLayout';

export type ZoneName = 'top' | 'bot' | 'left' | 'right';
export interface IDetectionZoneLayout extends IBaseGameComponentLayout {
	selector: 'detectionZone';
	zoneName?: ZoneName;
	// height: number;
	// width: number;
	radius: number;
	color: PIXI.ColorSource;
	children?: GameLayouts[];
}

@GameComponent({
	selector: 'detectionZone',
	layout: DetectionZoneLayout,
})
export class DetectionZoneComponent extends AXContainer {
	protected hover: AXGraphics;
	// protected rectWidth: number;
	// protected rectHeight: number;
	protected circleRadius: number;
	protected isMoving: boolean = false;
	private lineColor: PIXI.ColorSource = 0x00ffff;

	protected onAdded(): void {
		const gr = new PIXI.Graphics();
		gr.lineStyle(7, this.lineColor);
		//making a rectangle
		// gr.moveTo(-this.rectWidth / 2, -this.rectHeight / 2);
		// gr.lineTo(this.rectWidth / 2, -this.rectHeight / 2);
		// gr.lineTo(this.rectWidth / 2, this.rectHeight / 2);
		// gr.lineTo(-this.rectWidth / 2, this.rectHeight / 2);
		// gr.lineTo(-this.rectWidth / 2, -(this.rectHeight / 2 + 3)); // + 3 is a hack to fix little visual bug in the last corner of rect drawing

		// this.addChild(gr);

		// this.hover.width = 180;
		// this.hover.height = 180;

		//making a circle instead of rectangle


		const radius = this.circleRadius
		gr.drawCircle(0, 0, radius);

		this.addChild(gr);

		this.hover.width = radius * 2;
		this.hover.height = radius * 2;


		this.on('pointerdown', (event) => {
			this.isMoving = true;
		});

		this.on('pointermove', (event) => {
			if (!this.isMoving) return;
			this.parent.toLocal(event.global, null, this.position);
		});

		this.on('pointerupoutside', (event) => {
			this.isMoving = false;
		});

		this.on('pointerup', (event) => {
			this.isMoving = false;
		});
	}

	set color(val: PIXI.ColorSource) {
		this.lineColor = val;
	}
	// set width(val: number) {
	// 	this.rectWidth = val;
	// }
	// set height(val: number) {
	// 	this.rectHeight = val;
	// }

	set radius(val: number) {
		this.circleRadius = val;
	}
}
