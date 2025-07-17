import { LoaderResource } from '@sandsb2b/areax-pixi-core';

type resourceType = 'common' | 'mobile' | 'desktop';
export const resourceConfig: Record<resourceType, LoaderResource[]> = {
	common: [
		// ------------ FONTS
		{
			loadGroup: 'preload',
			name: 'OpenSans SemiBold',
			url: 'assets/fonts/OpenSans-SemiBold.ttf',
		},
		{
			loadGroup: 'preload',
			name: 'SairaExtraCondensed-SemiBold',
			url: 'assets/fonts/SairaExtraCondensed-SemiBold.ttf',
		},
		// ------------ END FONTS

		{
			loadGroup: 'preload',
			name: 'spaceship',
			url: 'assets/spaceship.jpg',
		},
		{
			loadGroup: 'initial',
			name: 'roulettePlaceHolder',
			url: 'assets/roulette0001.png',
		},
		{
			loadGroup: 'initial',
			name: 'general',
			url: 'assets/general.json',
		},

		// ------------ SOUNDS
		{
			loadGroup: 'initial',
			name: 'btn_sound',
			url: '/assets/sounds/spongebob-fail.webm, /assets/sounds/spongebob-fail.mp3',
			data: {
				resourceType: 'sound',
				options: {
					name: 'btn_sound',
					group: 'sfx',
					volume: 0.1,
				},
			},
		},
		{
			loadGroup: 'initial',
			name: 'btn_sound2',
			url: '/assets/sounds/spongebob-fail2.webm, /assets/sounds/spongebob-fail2.mp3',
			data: {
				resourceType: 'soundSprite',
				sprite: [
					{
						name: 'test',
						start: '0:00.000',
						end: '0:02.100',
						group: 'sfx',
						volume: 0.8,
					},
					{
						name: 'test2',
						start: '0:02.100',
						end: '0:03.100',
						group: 'sfx',
						volume: 0.8,
					},
				],
			},
		},
		// ------------ END SOUNDS
	],
	mobile: [],
	desktop: [],
};
