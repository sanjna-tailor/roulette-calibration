import { AXContainer, AXSprite, GameComponent } from '@sandsb2b/areax-pixi-core';
import { LoadingSceneLayout } from './LoadingSceneLayout';
import { LoadingSceneMediator } from './LoadingSceneMediator';

@GameComponent({
	selector: 'loadingScene',
	layout: LoadingSceneLayout,
	mediator: LoadingSceneMediator,
})
export class LoadingSceneComponent extends AXContainer {
	protected _background: AXSprite;

	public hide(): void {}

	public onAdded() {}

	public show(): void {}

	public setProgress(progress: number): void {
		// this._background.scale.set(progress);
	}
}
