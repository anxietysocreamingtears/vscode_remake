# Aster Code

Aster Code is a custom Code - OSS build based on the Visual Studio Code source tree. It keeps the normal editor and extension workflow, removes AI-focused features, and adds a cleaner branded desktop experience.

## Features

- Full desktop editor workflow based on Code - OSS
- Extensions Marketplace support
- Local `.vsix` installation support
- AI-related extensions blocked at install time
- Copilot and assistant UI removed from the desktop experience
- Custom Aster Code branding and icons
- Refined welcome screen and polished UI spacing
- Optional Windows acrylic effect with the `ui.acrylic.enabled` setting

## Differences From Original VS Code

- Product branding was renamed from Code - OSS / VS Code defaults to Aster Code
- AI-first UI entry points were removed or hidden
- AI marketplace content is filtered out and AI extension installs are blocked
- The welcome experience was simplified and rebuilt around a non-AI workflow
- Windows builds can use a translucent acrylic-style interface layer

## Project Structure

- `src/` core workbench, platform, and window code
- `extensions/` bundled extensions shipped with the app
- `build/` build scripts, packaging tasks, hygiene checks, and pipeline helpers
- `scripts/` development launch helpers for desktop, web, and CLI targets
- `product.json` product identity, branding, and marketplace configuration

## Run From Source

Windows development flow:

```powershell
npm install
npm run watch
.\scripts\code.bat
```

Notes:

- Run the commands from the repository root
- `npm run watch` keeps the source build updated while you work
- `.\scripts\code.bat` launches the desktop app from the local development build

## Build The Windows App

This project uses the official Code - OSS packaging pipeline.

```powershell
npm install
npm run gulp -- vscode-win32-x64-min
```

Expected output:

- Packaged folder: `dist/AsterCode-win32-x64`
- Main executable: `dist/AsterCode-win32-x64/Aster Code.exe`

## Configuration

Windows acrylic mode can be toggled with:

```json
{
  "ui.acrylic.enabled": true
}
```

Behavior:

- `false` keeps the normal opaque desktop UI
- `true` enables the Windows acrylic background material with translucent workbench surfaces

## Extension Support

Aster Code keeps the normal extension workflow:

- Browse and install from the Marketplace
- Uninstall or disable extensions from the Extensions view
- Install local `.vsix` packages

AI-specific extensions and integrations are intentionally blocked. Non-AI extensions continue to work through the standard VS Code extension system.

## Screenshots

The repository currently focuses on source and packaged builds. Screenshots can be added later under `docs/screenshots/` if you want to publish polished captures of the current Aster Code UI.

## License

This repository remains under the [MIT License](LICENSE.txt), following the upstream Code - OSS source license.
