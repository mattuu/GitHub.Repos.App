$token = Get-Content('.\.keys\github_pat')

Write-Host("Environment variable set:")
Write-Host("GITHUB_AUTH_TOKEN =", $token);
