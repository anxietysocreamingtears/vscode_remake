/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Color } from '../../../base/common/color.js';
import { isWindows } from '../../../base/common/platform.js';
import { IConfigurationService } from '../../configuration/common/configuration.js';

export const AcrylicSetting = 'ui.acrylic.enabled';
export const AcrylicWindowBackgroundColor = '#00000000';

export const AcrylicOpacities = {
	titleBarActive: 0.72,
	titleBarInactive: 0.58,
	sideBar: 0.78,
	panel: 0.76,
	editor: 0.86,
	statusBar: 0.82
} as const;

const DefaultAcrylicFallback = Color.fromHex('#10141b');

export function isAcrylicEnabled(configurationService: IConfigurationService): boolean {
	return isWindows && configurationService.getValue<boolean>(AcrylicSetting) === true;
}

export function toAcrylicColor(color: Color | undefined, opacity: number, fallback: Color = DefaultAcrylicFallback): string {
	return (color ?? fallback).transparent(opacity).toString();
}

export function toAcrylicColorFromString(color: string | undefined, opacity: number, fallback?: string): string | undefined {
	const parsed = color ? Color.Format.CSS.parse(color) : undefined;
	if (parsed) {
		return parsed.transparent(opacity).toString();
	}

	const fallbackColor = fallback ? Color.Format.CSS.parse(fallback) : undefined;
	if (fallbackColor) {
		return fallbackColor.transparent(opacity).toString();
	}

	return color ?? fallback;
}
