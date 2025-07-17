import { AXCoreLayouts } from '@sandsb2b/areax-pixi-core';
import { IDetectionZoneLayout } from '../components/detectionZone/DetetionZoneComponent';
import { IMainSceneLayout } from '../components/mainScene/MainSceneComponent';
import { layoutTemplates } from '../layoutTemplates';

type Layouts = AXCoreLayouts | IMainSceneLayout | IDetectionZoneLayout;

export type GameLayouts = Layouts & {
	template?: keyof typeof layoutTemplates;
};
