import { bindActionToEvent, DisplayDataManager, GameAction, inject, LoaderManager } from '@sandsb2b/areax-pixi-core';
import { resourceConfig } from '../GameResourcesConfig';
import { GameEvents } from '../types/GameEvents';

@bindActionToEvent<GameEvents>('prepareResources', true)
export class PrepareResourceAction extends GameAction<GameEvents> {
	protected loaderManager: LoaderManager = inject(LoaderManager);
	protected displayDataManager: DisplayDataManager = inject(DisplayDataManager);

	public async run(): Promise<void> {
		const resources = [
			...resourceConfig.common,
			...(this.displayDataManager.params.deviceType === 'desktop' ? resourceConfig.desktop : resourceConfig.mobile),
		];
		this.loaderManager.prepareResources(resources);

		this.resolve();
	}
}
