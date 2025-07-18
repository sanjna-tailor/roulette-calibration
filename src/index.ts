import {
	AXApplication,
	DisplayDataManager,
	EventEmitter,
	IGameActionConstructor,
	IGameComponentConstructor,
	inject,
} from '@sandsb2b/areax-pixi-core';
import { GameStartAction } from './actions/GameStartAction';
import { PrepareResourceAction } from './actions/PrepareResourcesAction';
import { DetectionZoneComponent } from './components/detectionZone/DetectionZoneComponent';
import { SquareFrameComponent } from './components/detectionZone/SquareFrameComponent';
import { SensorZoneComponent } from './components/detectionZone/SensorZoneComponent';
import { LoadingSceneComponent } from './components/loadingScene/LoadingSceneComponent';
import { MainSceneComponent } from './components/mainScene/MainSceneComponent';
import './first';
import { layoutTemplates } from './layoutTemplates';
import { GameEvents } from './types/GameEvents';

const components: IGameComponentConstructor[] = [LoadingSceneComponent, MainSceneComponent, DetectionZoneComponent, SquareFrameComponent, SensorZoneComponent];

const actions: IGameActionConstructor[] = [GameStartAction, PrepareResourceAction];

export class AXGame extends AXApplication {
	protected eventEmitter: EventEmitter<GameEvents> = inject(EventEmitter);

	constructor() {
		super(document.getElementById('root'), {
			backgroundAlpha: 0,
		});
	}

	protected init(): void {
		// this.renderManager.renderer.view.style.backgroundColor = '#181818';
		this.registerComponents(components);
		this.registerActions(actions);
		this.registerLayoutTemplates(layoutTemplates);
		this.eventEmitter.emit('startGame');
	}
}

//
const game = new AXGame();

const resize = () => {
	const { innerHeight, innerWidth } = window;
	const displayDataManager: DisplayDataManager = inject(DisplayDataManager);
	const orientation = innerWidth >= innerHeight ? 'landscape' : 'portrait';
	displayDataManager.update({
		// orientation: orientation,
		// deviceType: 'mobile',
		orientation: 'landscape',
		deviceType: 'desktop',
		designSize: { width: 1920, height: 1080 },
		viewSize: {
			width: innerWidth,
			height: innerHeight,
		},
	});
};

const resizeApp = () => {
	resize();
	setTimeout(() => {
		resize();
	}, 300);
};

resizeApp();
window.onresize = () => {
	resizeApp();
};
screen.orientation.onchange = () => {
	resizeApp();
};
