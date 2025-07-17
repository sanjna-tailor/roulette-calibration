import { Mediator } from '@sandsb2b/areax-pixi-core';
import { GameEvents } from '../../types/GameEvents';
import { MainSceneComponent } from './MainSceneComponent';

export class MainSceneMediator extends Mediator<GameEvents> {
	protected view: MainSceneComponent;

	protected initialize() {}
}
