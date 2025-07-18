import * as PIXI from 'pixi.js';
import { AXContainer, AXGraphics, GameComponent, IBaseGameComponentLayout } from '@sandsb2b/areax-pixi-core';
import { GameLayouts } from '../../types/GameLayouts';
import { SensorZoneLayout } from './SensorZoneLayout';

export type ZoneName = 'top' | 'bot' | 'left' | 'right';
export interface ISensorZoneLayout extends IBaseGameComponentLayout {
	selector: 'sensorZone';
	zoneName?: ZoneName;
	height: number;
	width: number;
	// maxRadius: number;
	// minRadius: number;
	color: PIXI.ColorSource;
	children?: GameLayouts[];
}

@GameComponent({
	selector: 'sensorZone',
	layout: SensorZoneLayout,
})
export class SensorZoneComponent extends AXContainer {
	protected hover: AXGraphics;
	// protected rectWidth: number;
	// protected rectHeight: number;
	//protected maxRadius: number;
	//protected minRadius: number;
	protected isMoving: boolean = false;
	private lineColor: PIXI.ColorSource = 0x00ffff;

	protected onAdded(): void {
		const gr = new PIXI.Graphics();
		gr.lineStyle(7, this.lineColor);

		// Draws center with set radius
		gr.beginFill(this.lineColor);
		gr.drawCircle(0, 0, 10);
		gr.endFill();

		this.addChild(gr);

		this.hover.width = 100;
		this.hover.height = 100;


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
}
