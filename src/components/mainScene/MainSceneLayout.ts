import { IMainSceneLayout } from './MainSceneComponent';

// export const MainSceneLayout: IMainSceneLayout = {
export const MainSceneLayout: IMainSceneLayout = {
	selector: 'mainScene',
	children: [
		{
			name: '_dark',
			selector: 'graphics',
			shape: 'rect',
			color: 0x7d7d7d,
			alpha: 1,
			width: 200,
			height: 200,
			pivot: { x: 100, y: 100 },
			eventMode: 'none',
			extensions: [
				{
					type: 'fullSize',
					config: {},
				},
			],
		},
		{
			name: 'targetSize',
			selector: 'graphics',
			shape: 'rect',
			color: 0xf0f000,
			width: 1920,
			height: 1080,
			pivot: { x: 960, y: 540 },
			alpha: 1,
		},
		{
			name: 'videoPlaceHolder',
			selector: 'sprite',
			img: 'roulettePlaceHolder',
			anchor: 0.5,
		},
		{
			name: 'videoSprite',
			selector: 'sprite',
			anchor: 0.5,
			width: 1920,
			height: 1080,
		},
		{
			name: 'radiusGraphic',
			selector: 'detectionZone',
			zoneName: 'top',
			maxRadius: 325,
			minRadius: 250,
			y: 0,
			centerColor: 0xFF00FF,
			minColor: 0x3BFC19,
			maxColor: 0x362AE4,
		},
		{ 
			name: 'squareGraphic',
			selector: 'squareFrame',
			sideLength: 1000,
			x: 0,
			y: 0,
			color: 0xFF0505,
		},
		{
			name: 'sensor1',
			selector: 'sensorZone',
			height: 100,
			width: 100,
			x: 250,
			y: 100,
			color: 0xFFAE00,
		},
		{
			name: 'sensor2',
			selector: 'sensorZone',
			height: 100,
			width: 100,
			x: -250,
			y: 100,
			color: 0xFFAE00,
		},
		{
			name: 'sensor3',
			selector: 'sensorZone',
			height: 100,
			width: 100,
			x: 0,
			y: -250,
			color: 0xFFAE00,
		},


		{
			name: 'applyBtn',
			selector: 'button',
			img: {
				normal: 'backbet1',
				hover: 'backbet1',
				down: 'backbet',
				disabled: 'backbet',
			},
			label: {
				selector: 'text',
				text: 'SAVE',
				anchor: 0.5,
				style: {
					fontSize: 24,
					fill: '0xffffff',
					textTransform: 'uppercase',
					fontFamily: 'OpenSans SemiBold',
				},
				maxSize: { width: 130 },
			},
			position: { x: 840, y: -485 },
			scale: 1.25,
		},

		{
			selector: 'text',
			text: 'MAX RADIUS',
			anchor: 0,
			style: {
				fontSize: 36,
				fill: '0x0047AB',
				textTransform: 'uppercase',
				fontFamily: 'OpenSans SemiBold',
			},
			position: { x: -930, y: -515 },
		},
		{
			selector: 'text',
			text: 'CENTER',
			anchor: 0,
			style: {
				fontSize: 36,
				fill: '0xFF00FF',
				textTransform: 'uppercase',
				fontFamily: 'OpenSans SemiBold',
			},
			position: { x: -930, y: -465 },
		},
		{
			selector: 'text',
			text: 'MIN RADIUS',
			anchor: 0,
			style: {
				fontSize: 36,
				fill: '0x3bfc19',
				textTransform: 'uppercase',
				fontFamily: 'OpenSans SemiBold',
			},
			position: { x: -930, y: -415 },
		},
		{
			selector: 'text',
			text: 'LEFT',
			anchor: 0,
			style: {
				fontSize: 36,
				fill: '0x9219fc',
				textTransform: 'uppercase',
				fontFamily: 'OpenSans SemiBold',
			},
			position: { x: -930, y: -365 },
		},
		// {
		// 	name: 'radiusSlider',
		// 	selector: 'slider',
		// 	min: 50,
		// 	max: 500,
		// 	value: 320, // initial value matching topR's radius
		// 	width: 300,
		// 	position: { x: 600, y: -485 },
		// 	onChange: 'onRadiusSliderChange',
		// },

		{
			name: 'radiusValueLabel',
			selector: 'text',
			text: 'Radius: 320',
			anchor: 0,
			style: {
				fontSize: 24,
				fill: '0xffffff',
				fontFamily: 'OpenSans SemiBold',
			},
			position: { x: 600, y: -530 },
		},


	],
};
