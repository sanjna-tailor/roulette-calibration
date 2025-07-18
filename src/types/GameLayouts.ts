import { AXCoreLayouts } from '@sandsb2b/areax-pixi-core';
import { IDetectionZoneLayout } from '../components/detectionZone/DetectionZoneComponent';
import { ISquareFrameLayout } from '../components/detectionZone/SquareFrameComponent';
import { ISensorZoneLayout } from '../components/detectionZone/SensorZoneComponent';
import { IMainSceneLayout } from '../components/mainScene/MainSceneComponent';
import { layoutTemplates } from '../layoutTemplates';

type Layouts = AXCoreLayouts | IMainSceneLayout | IDetectionZoneLayout | ISquareFrameLayout | ISensorZoneLayout;

export type GameLayouts = Layouts & {
	template?: keyof typeof layoutTemplates;
};
