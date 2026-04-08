/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { MarkdownString } from '../../../base/common/htmlContent.js';
import * as nls from '../../../nls.js';
import { IExtensionManifest } from '../../extensions/common/extensions.js';
import { IExtensionIdentifier, IGalleryExtension } from './extensionManagement.js';

const blockedExtensionIds = new Set<string>([
	'github.copilot',
	'github.copilot-chat',
	'github.copilot-labs',
	'github.remotehub-copilot',
	'ms-vscode.vscode-chat-extension-pack',
	'ms-vscode.chat-tools',
]);

const blockedIdentifierFragments = [
	'.copilot',
	'.copilot-chat',
	'.chatgpt',
	'.openai',
	'.claude',
	'.gemini',
	'.anthropic',
	'.ollama',
];

const blockedTagKeywords = new Set<string>([
	'ai',
	'copilot',
	'chatgpt',
	'openai',
	'claude',
	'gemini',
	'anthropic',
	'ollama',
	'llm',
	'language-model',
	'language models',
	'prompt-engineering',
]);

const blockedTextPatterns = [
	/\bartificial intelligence\b/i,
	/\bai assistant\b/i,
	/\bcode assistant\b/i,
	/\bchat assistant\b/i,
	/\blanguage model\b/i,
	/\bgenerative ai\b/i,
	/\bprompt engineering\b/i,
	/\bcopilot\b/i,
	/\bchatgpt\b/i,
	/\bopenai\b/i,
	/\bclaude\b/i,
	/\bgemini\b/i,
	/\banthropic\b/i,
	/\bollama\b/i,
	/\bllm\b/i,
];

const blockedContributionKeys = new Set<string>([
	'chatParticipants',
	'languageModelTools',
	'languageModelDataPartTransformers',
	'languageModelToolSets',
	'languageModelStats',
]);

function normalize(value: string | undefined): string {
	return value?.trim().toLowerCase() ?? '';
}

function matchesBlockedIdentifier(id: string | undefined): boolean {
	const normalized = normalize(id);
	if (!normalized) {
		return false;
	}

	if (blockedExtensionIds.has(normalized)) {
		return true;
	}

	return blockedIdentifierFragments.some(fragment => normalized.includes(fragment));
}

function matchesBlockedText(values: Array<string | undefined>): boolean {
	const text = values
		.map(value => normalize(value))
		.filter(value => !!value)
		.join('\n');

	if (!text) {
		return false;
	}

	return blockedTextPatterns.some(pattern => pattern.test(text));
}

function matchesBlockedTags(values: readonly string[] | undefined): boolean {
	return !!values?.some(value => blockedTagKeywords.has(normalize(value)));
}

export function isAsterAiExtensionIdentifier(identifier: IExtensionIdentifier | undefined): boolean {
	return matchesBlockedIdentifier(identifier?.id);
}

export function isAsterAiGalleryExtension(extension: Pick<IGalleryExtension, 'identifier' | 'name' | 'displayName' | 'description' | 'categories' | 'tags'>): boolean {
	return matchesBlockedIdentifier(extension.identifier.id)
		|| matchesBlockedTags(extension.categories)
		|| matchesBlockedTags(extension.tags)
		|| matchesBlockedText([extension.name, extension.displayName, extension.description]);
}

export function isAsterAiManifest(manifest: IExtensionManifest): boolean {
	const contributionKeys = Object.keys(manifest.contributes ?? {});

	return matchesBlockedIdentifier(`${manifest.publisher}.${manifest.name}`)
		|| matchesBlockedTags(manifest.categories)
		|| matchesBlockedTags(manifest.keywords)
		|| contributionKeys.some(key => blockedContributionKeys.has(key))
		|| matchesBlockedText([
			manifest.name,
			manifest.displayName,
			manifest.description,
			...(manifest.enabledApiProposals ?? []),
			...contributionKeys,
		]);
}

export function getAsterAiExtensionBlockMessage(extensionName: string): MarkdownString {
	return new MarkdownString().appendText(nls.localize('aster.aiExtensionBlocked', "AI-related extensions are disabled in AsterCode. '{0}' cannot be installed.", extensionName));
}
