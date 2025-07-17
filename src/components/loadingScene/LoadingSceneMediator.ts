import { LoadGroup, Mediator } from '@sandsb2b/areax-pixi-core';
import { GameEvents } from '../../types/GameEvents';
import { LoadingSceneComponent } from './LoadingSceneComponent';

export class LoadingSceneMediator extends Mediator<GameEvents> {
	protected view: LoadingSceneComponent;

	protected initialize() {
		this.on('gameLoading', this.onGameLoading.bind(this));
	}

	protected onGameLoading(data: { progress: number; group: LoadGroup }) {
		if (data.group === 'initial') {
			this.view.setProgress(data.progress / 100);
		}
	}
}
