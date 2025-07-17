import { GameAction, LoaderManager, bindActionToEvent, inject } from '@sandsb2b/areax-pixi-core';
import { GameEvents } from '../types/GameEvents';

@bindActionToEvent<GameEvents>('startGame')
export class GameStartAction extends GameAction<GameEvents> {
	protected loaderManager: LoaderManager = inject(LoaderManager);

	public async run(): Promise<any> {
		try {
			//ToDo send init/get state request
			await this.promiseEmit('prepareResources');
			await this.loaderManager.load('preload');
			await this.promiseEmit('createGameScene', 'loadingScene');
			await this.promiseEmit('runGameScene', 'loadingScene');
			await Promise.all([
				this.loaderManager.load('initial'),
				// gsap.delayedCall(2, () => {}).then()
			]);
			await this.promiseEmit('createGameScene', 'mainScene');
			this.emit('gameReady');
			await this.promiseEmit('runGameScene', 'mainScene');
			this.resolve();
		} catch (e) {
			// ToDo show error notification
			console.log(e);
			this.reject();
		}
	}
}
