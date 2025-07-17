import { BroadcastEvent, Director, LayerInfo, Media, MediaLayer, MediaStreamLayers, View } from '@millicast/sdk';

async function connectDolbyStream(htmlVideo: HTMLVideoElement, streamName: string, accId: string) {
	const tokenGenerator = () =>
		Director.getSubscriber({
			streamName: streamName,
			streamAccountId: accId,
		});

	const millicastView = new View(undefined, tokenGenerator, htmlVideo, true);

	millicastView.on('broadcastEvent', (event: BroadcastEvent) => {
		switch (event.name) {
			case 'layers': {
				const mediaStreamLayers: MediaStreamLayers = event.data as MediaStreamLayers;
				const mediaInfo: Media = mediaStreamLayers.medias[0];
				const biggestMediaLayer: MediaLayer = mediaInfo.active.sort((a, b) => b.bitrate - a.bitrate)[0];
				const biggestLayerInfo: LayerInfo = mediaInfo.layers.find((layer) => layer.encodingId === biggestMediaLayer.id);
				millicastView.select(biggestLayerInfo);
				break;
			}
		}
	});

	// Start connection to publisher
	try {
		htmlVideo.muted = true;
		await millicastView.connect({ events: ['layers'] });
		htmlVideo.play();
	} catch (e) {
		console.log('Connection failed, handle error', e);
	}
}

export { connectDolbyStream as default };
export { connectDolbyStream };
