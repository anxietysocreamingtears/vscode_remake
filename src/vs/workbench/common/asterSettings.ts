/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IConfigurationService } from '../../platform/configuration/common/configuration.js';

export const AsterPerformanceModeSetting = 'astra.performance.mode';
export const AsterAccentColorSetting = 'ui.accentColor';
export const AsterDensitySetting = 'ui.density';

export const AsterAccentColorValues = ['auto', 'ocean', 'mint', 'amber', 'rose', 'graphite'] as const;
export type AsterAccentColorId = typeof AsterAccentColorValues[number];

export const AsterDensityValues = ['normal', 'compact'] as const;
export type AsterDensityOption = typeof AsterDensityValues[number];

export function isAsterPerformanceModeEnabled(configurationService: IConfigurationService): boolean {
	return configurationService.getValue<boolean>(AsterPerformanceModeSetting) === true;
}

export function getAsterAccentColor(configurationService: IConfigurationService): AsterAccentColorId {
	const value = configurationService.getValue<string>(AsterAccentColorSetting);
	return AsterAccentColorValues.includes(value as AsterAccentColorId) ? value as AsterAccentColorId : 'auto';
}

export function getAsterDensity(configurationService: IConfigurationService): AsterDensityOption {
	const value = configurationService.getValue<string>(AsterDensitySetting);
	return AsterDensityValues.includes(value as AsterDensityOption) ? value as AsterDensityOption : 'normal';
}
