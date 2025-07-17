import { Texture } from 'pixi.js';
import {
	AXButton,
	AXContainer,
	AXGraphics,
	AXSprite,
	GameComponent,
	IBaseGameComponentLayout,
} from '@sandsb2b/areax-pixi-core';
import connectDolbyStream from '../../helpers/videoStream';
import { GameLayouts } from '../../types/GameLayouts';
import { DetectionZoneComponent } from '../detectionZone/DetetionZoneComponent';
import { MainSceneLayout } from './MainSceneLayout';
import { MainSceneMediator } from './MainSceneMediator';
import { Coordinates } from '../../types/GameEvents';

export interface IMainSceneLayout extends IBaseGameComponentLayout {
	selector: 'mainScene';
	children?: GameLayouts[];
}

@GameComponent({
	selector: 'mainScene',
	layout: MainSceneLayout,
	mediator: MainSceneMediator,
})
export class MainSceneComponent extends AXContainer {
	protected topR: DetectionZoneComponent;
	protected botR: DetectionZoneComponent;
	protected rightR: DetectionZoneComponent;
	protected leftR: DetectionZoneComponent;
	protected applyBtn: AXButton;
	protected _dark: AXGraphics;
	public targetSize: AXGraphics;
	protected videoSprite: AXSprite;
	protected videoHtmlElement: HTMLVideoElement;
	private isStreamConnected: boolean = false;
	private isVideoPLaying: boolean = false;
	private targetObj: any = null;
	private streamId: string = '';
	private streamToken: string = 'evCn9f';

	/////

// 	public onRadiusSliderChange(value: number): void {
// 		if (this.topR) {
// 			this.topR.radius = value;

// 			const label = this.getChildByName('radiusValueLabel') as any;
// 			if (label && label.text !== undefined) {
// 				label.text = `Radius: ${value}`;
// 			}
// 		}
// }

	/////

	public onAdded() {
		const searchParams = new URLSearchParams(window.location.search);
		this.streamId = searchParams.get('streamID');

		this.videoHtmlElement = document.createElement('video');
		this.videoHtmlElement.autoplay = true;
		this.videoHtmlElement.playsInline = true;
		this.videoHtmlElement.muted = true;
		this.videoHtmlElement.setAttribute('webkit-playsinline', 'true');
		this.videoHtmlElement.width = this.targetSize.width;
		this.videoHtmlElement.height = this.targetSize.height;

		this.videoHtmlElement.onresize = (data) => {
			this.onVideoResize();
		};

		document.addEventListener('click', this.onFirstClick.bind(this), { once: true });
		document.addEventListener('touchend', this.onFirstClick.bind(this), { once: true });

		if (this.streamId !== '') this.initiateStream();

		this.applyBtn.on('buttonClick', async () => {
			if (this.streamId === '') return;

			this.applyBtn.isActive = false;

			await this.logCoordinates();

			this.applyBtn.isActive = true;
		});



		this.getCoordinates();
		////

		// const radiusSlider = this.getChildByName('radiusSlider') as any;
		// if (radiusSlider) {
		// 	radiusSlider.on('change', this.onRadiusSliderChange.bind(this));
		// }
		////
	}

	protected async initiateStream(): Promise<any> {
		try {
			await connectDolbyStream(this.videoHtmlElement, this.streamId, this.streamToken);
			this.isStreamConnected = true;
			const promise = this.videoHtmlElement.play();

			if (promise !== undefined) {
				promise
					.then(() => {
						this.startVideo();
					})
					.catch((error) => {
						console.error('Autoplay was prevented:', error);
						// Optionally show a "Play" button to start playback manually
					});
			}
		} catch (error) {
			console.error('Failed to initiate video stream:', error);
		}
	}

	protected startVideo(): void {
		this.isVideoPLaying = true;
		const videoTexture = Texture.from(this.videoHtmlElement);
		this.videoSprite.texture = videoTexture;
		this.updateVideoSpriteScale();
	}

	protected onFirstClick(): void {
		if (!this.isVideoPLaying && this.isStreamConnected) {
			this.startVideo();
		}
		this.videoHtmlElement.muted = false;
	}

	protected onVideoResize(): void {
		this.videoSprite.texture.baseTexture.setSize(this.videoHtmlElement.videoWidth, this.videoHtmlElement.videoHeight);
		this.videoSprite.texture.update();
		this.updateVideoSpriteScale();
	}

	protected updateVideoSpriteScale(): void {
		const scale = this.targetSize.width / this.videoHtmlElement.videoWidth;
		this.videoSprite.scale.set(scale);
	}

	public async getCoordinates(): Promise<any> {
		const url = 'https://stream-coords.sds.red/coordinates?stream=' + this.streamId;

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': 'secret123456789'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: { streamID: string, coords: Coordinates } = await response.json();
			this.setCoordinates(data.coords);
			console.log('Coordinates:', data.coords);
			return data;
		} catch (error) {
			console.error('Error:', error);
		}
	}

	private setCoordinates(data: Coordinates): void {
		const { top, bottom, left, right } = data;
		if (top[0] !== 0 && top[1] !== 0) this.topR.position.set(top[0], top[1]);
		if (bottom[0] !== 0 && bottom[1] !== 0) this.botR.position.set(bottom[0], bottom[1]);
		if (left[0] !== 0 && left[1] !== 0) this.leftR.position.set(left[0], left[1]);
		if (right[0] !== 0 && right[1] !== 0) this.rightR.position.set(right[0], right[1]);
	}

	public async logCoordinates(): Promise<any> {
		const url = 'https://stream-coords.sds.red/coordinates';

		const bodyData: { streamID: string, coords: Coordinates } = {
			streamID: this.streamId,
			coords: {
				top: [this.topR.x, this.topR.y],
				bottom: [this.botR.x, this.botR.y],
				left: [this.leftR.x, this.leftR.y],
				right: [this.rightR.x, this.rightR.y]
			}
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': 'secret123456789'
				},
				body: JSON.stringify(bodyData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = response.json();
			console.log('Response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	}
}
