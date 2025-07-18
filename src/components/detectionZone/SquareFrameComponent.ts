import * as PIXI from 'pixi.js';
import { AXContainer, AXGraphics, GameComponent, IBaseGameComponentLayout } from '@sandsb2b/areax-pixi-core';
import { GameLayouts } from '../../types/GameLayouts';
import { SquareFrameLayout } from './SquareFrameLayout';

//export type ZoneName = 'top' | 'bot' | 'left' | 'right';
export interface ISquareFrameLayout extends IBaseGameComponentLayout {
	selector: 'squareFrame';
	sideLength: number;
	color: PIXI.ColorSource;
	children?: GameLayouts[];
}

@GameComponent({
	selector: 'squareFrame',
	layout: SquareFrameLayout,
})
export class SquareFrameComponent extends AXContainer {
	protected hoverTop: AXGraphics;
	protected hoverLeft: AXGraphics;
	protected hoverBottom: AXGraphics;
	protected hoverRight: AXGraphics;
	protected sideLength: number;
	protected isMoving: boolean = false;
	private lineColor: PIXI.ColorSource = 0x00ffff;
	private dragOffset: PIXI.Point | null = null;

	protected onAdded(): void {
		const gr = new PIXI.Graphics();
		gr.lineStyle(7, this.lineColor);
		//making a square
		gr.drawRect(-this.sideLength / 2, -this.sideLength / 2, this.sideLength, this.sideLength);

		this.addChild(gr);

		// creating hover graphics for each side of the square
		//sideLength+50 covers the gaps at the corners
		[
			{ obj: this.hoverTop, width: this.sideLength+50, height: 50 },
			{ obj: this.hoverLeft, width: 50, height: this.sideLength },
			{ obj: this.hoverBottom, width: this.sideLength+50, height: 50 },
			{ obj: this.hoverRight, width: 50, height: this.sideLength },
		].forEach(side => {
			side.obj.width = side.width;
			side.obj.height = side.height;
		});

		// object drag logic
		this.on('pointerdown', (event) => {
			this.isMoving = true;
			// Calculate offset between pointer and square center, so square doesnt jump to pointer position
			const pointerPos = event.getLocalPosition(this.parent);
			this.dragOffset = new PIXI.Point(pointerPos.x - this.x, pointerPos.y - this.y);
		});

		this.on('pointermove', (event) => {
			if (!this.isMoving || !this.dragOffset) return;
			const pointerPos = event.getLocalPosition(this.parent);
			this.position.set(pointerPos.x - this.dragOffset.x, pointerPos.y - this.dragOffset.y);
		});

		this.on('pointerupoutside', (event) => {
			this.isMoving = false;
			this.dragOffset = null;
		});

		this.on('pointerup', (event) => {
			this.isMoving = false;
			this.dragOffset = null;
		});
	}

	set color(val: PIXI.ColorSource) {
		this.lineColor = val;
	}
	set SideLength(val: number) {
		this.sideLength = val;
	}
}
