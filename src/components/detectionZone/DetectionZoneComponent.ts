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
	maxRadius: number;
	minRadius: number;
	centerColor: PIXI.ColorSource;
	minColor: PIXI.ColorSource;
	maxColor: PIXI.ColorSource;
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
	protected maxRadius: number;
	protected minRadius: number;
	protected isMoving: boolean = false;
	private centerColor: PIXI.ColorSource;
	private minColor: PIXI.ColorSource;
	private maxColor: PIXI.ColorSource;

	protected onAdded(): void {
		const gr = new PIXI.Graphics();
		// Draws circles with configurable radii

		const maxRadius = this.maxRadius;
		const minRadius = this.minRadius;

		gr.lineStyle(7, this.maxColor);
		gr.drawCircle(0, 0, maxRadius);
		gr.lineStyle(7, this.minColor);
		gr.drawCircle(0, 0, minRadius);

		// Draws center with set radius
		gr.lineStyle(7, this.centerColor);
		gr.beginFill(this.centerColor);
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

	set CenterColor(val: PIXI.ColorSource) {
		this.centerColor = val;
	}
	set MinColor(val: PIXI.ColorSource) {
		this.minColor = val;
	}
	set MaxColor(val: PIXI.ColorSource) {
		this.maxColor = val;
	}

	set MaxRadius(val: number) {
		this.maxRadius = val;
	}
	set MinRadius(val: number) {
		this.minRadius = val;
	}

}
