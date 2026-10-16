# 1. No token → 451 (proves guard works)
curl.exe -i http://localhost:3000/projects

# 2. Login and get token
$login = Invoke-RestMethod -Uri http://localhost:3000/auth/login `
  -Method Post -ContentType 'application/json' `
  -Body '{"email":"pm@nirmaniq.com","password":"password123"}'
Write-Host "Token: $($login.accessToken.Substring(0,40))..."

# 3. Use token → 200 (proves guard lets valid users through)
Invoke-RestMethod -Uri http://localhost:3000/projects `
  -Headers @{ Authorization = "Bearer $($login.accessToken)" }