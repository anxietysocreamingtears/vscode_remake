param(
	[string]$SourceDir = (Join-Path $PSScriptRoot '..\dist\AsterCode-win32-x64'),
	[string]$InstallDir = (Join-Path $env:LOCALAPPDATA 'Programs\AsterCode'),
	[string]$ShortcutName = 'AsterCode.lnk'
)

$ErrorActionPreference = 'Stop'

$resolvedSourceDir = (Resolve-Path $SourceDir).Path
$resolvedInstallDir = [System.IO.Path]::GetFullPath($InstallDir)
$sourceExe = Join-Path $resolvedSourceDir 'AsterCode.exe'

if (-not (Test-Path $sourceExe)) {
	throw "Built executable was not found at '$sourceExe'. Build the packaged app before installing."
}

$desktopDir = [Environment]::GetFolderPath('Desktop')
$startMenuDir = Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\AsterCode'
$desktopShortcut = Join-Path $desktopDir $ShortcutName
$startMenuShortcut = Join-Path $startMenuDir $ShortcutName
$installedExe = Join-Path $resolvedInstallDir 'AsterCode.exe'

Get-Process -Name 'AsterCode' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

if (Test-Path $resolvedInstallDir) {
	Remove-Item -LiteralPath $resolvedInstallDir -Recurse -Force
}

New-Item -ItemType Directory -Path $resolvedInstallDir -Force | Out-Null
Copy-Item -Path (Join-Path $resolvedSourceDir '*') -Destination $resolvedInstallDir -Recurse -Force

New-Item -ItemType Directory -Path $startMenuDir -Force | Out-Null

$wshShell = New-Object -ComObject WScript.Shell

foreach ($shortcutPath in @($desktopShortcut, $startMenuShortcut)) {
	$shortcut = $wshShell.CreateShortcut($shortcutPath)
	$shortcut.TargetPath = $installedExe
	$shortcut.WorkingDirectory = $resolvedInstallDir
	$shortcut.IconLocation = "$installedExe,0"
	$shortcut.Description = 'Launch AsterCode'
	$shortcut.Save()
}

Write-Output "Installed to: $resolvedInstallDir"
Write-Output "Desktop shortcut: $desktopShortcut"
Write-Output "Start Menu shortcut: $startMenuShortcut"
