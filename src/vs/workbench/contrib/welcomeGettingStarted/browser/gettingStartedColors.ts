/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { contrastBorder, registerColor } from '../../../../platform/theme/common/colorRegistry.js';
import { localize } from '../../../../nls.js';

// Seprate from main module to break dependency cycles between welcomePage and gettingStarted.
export const welcomePageBackground = registerColor('welcomePage.background', { dark: '#0f1720', light: '#f5f7fb', hcDark: '#000000', hcLight: '#ffffff' }, localize('welcomePage.background', 'Background color for the Welcome page.'));

export const welcomePageTileBackground = registerColor('welcomePage.tileBackground', { dark: '#121a24', light: '#ffffff', hcDark: '#000000', hcLight: '#ffffff' }, localize('welcomePage.tileBackground', 'Background color for the tiles on the Welcome page.'));
export const welcomePageTileHoverBackground = registerColor('welcomePage.tileHoverBackground', { dark: '#182433', light: '#eef3fb', hcDark: null, hcLight: null }, localize('welcomePage.tileHoverBackground', 'Hover background color for the tiles on the Welcome.'));
export const welcomePageTileBorder = registerColor('welcomePage.tileBorder', { dark: '#243244', light: '#d8deea', hcDark: contrastBorder, hcLight: contrastBorder }, localize('welcomePage.tileBorder', 'Border color for the tiles on the Welcome page.'));


export const welcomePageProgressBackground = registerColor('welcomePage.progress.background', { dark: '#0b1220', light: '#dfe7f4', hcDark: '#000000', hcLight: '#ffffff' }, localize('welcomePage.progress.background', 'Foreground color for the Welcome page progress bars.'));
export const welcomePageProgressForeground = registerColor('welcomePage.progress.foreground', { dark: '#7dd3fc', light: '#2563eb', hcDark: '#ffffff', hcLight: '#0f1720' }, localize('welcomePage.progress.foreground', 'Background color for the Welcome page progress bars.'));

export const walkthroughStepTitleForeground = registerColor('walkthrough.stepTitle.foreground', { light: '#0f172a', dark: '#f8fafc', hcDark: null, hcLight: null }, localize('walkthrough.stepTitle.foreground', 'Foreground color of the heading of each walkthrough step'));
