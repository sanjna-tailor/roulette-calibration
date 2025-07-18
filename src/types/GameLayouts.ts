import { AXCoreLayouts } from '@sandsb2b/areax-pixi-core';
import { IDetectionZoneLayout } from '../components/detectionZone/DetectionZoneComponent';
import { ISquareFrameLayout } from '../components/detectionZone/SquareFrameComponent';
import { IMainSceneLayout } from '../components/mainScene/MainSceneComponent';
import { layoutTemplates } from '../layoutTemplates';

type Layouts = AXCoreLayouts | IMainSceneLayout | IDetectionZoneLayout | ISquareFrameLayout;

export type GameLayouts = Layouts & {
	template?: keyof typeof layoutTemplates;
};
