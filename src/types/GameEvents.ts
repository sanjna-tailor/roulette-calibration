import { AXCoreEvents } from '@sandsb2b/areax-pixi-core';

export type GameEvents = AXCoreEvents & {
	startGame: void;
	prepareResources: void;
	gameReady: void;
	startRolling: void;
	logView: void;
};

export type Coordinates = {
	top: number[],
	bottom: number[],
	left: number[],
	right: number[]
}