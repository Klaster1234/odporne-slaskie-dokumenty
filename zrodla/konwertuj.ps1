param([string[]]$Pliki)
$dir = "C:\Users\ptovm\AppData\Local\Temp\claude\C--dev\1c322336-2b5a-48e6-b5e2-32bc67a44dd5\scratchpad\mms\dokumenty"
Get-Process WINWORD -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try { $word.AutomationSecurity = 3 } catch {}
try { $word.Options.DoNotPromptForConvert = $true } catch {}
try { $word.Options.ConfirmConversions = $false } catch {}
foreach ($p in $Pliki) {
  $src = Join-Path $dir "$p.docx"; $dst = Join-Path $dir "$p.pdf"
  if (Test-Path $dst) { Remove-Item $dst -Force }
  $doc = $word.Documents.Open($src, $false, $true, $false)
  $doc.ExportAsFixedFormat($dst, 17)
  $doc.Close(0)
  Write-Output ("{0,-36} {1,8:N0} B" -f $p, (Get-Item $dst).Length)
}
$word.Quit()
