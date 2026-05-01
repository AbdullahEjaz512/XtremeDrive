# 🧪 TEST PLAN - Critical Test Cases

## Authentication Tests

### Test 1.1: Valid Signup
```
POST /api/auth/signup
{
  "email": "user1@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "phone": "1234567890",
  "city": "Lahore"
}

Expected:
✓ Status: 201
✓ Response includes: user { id, email, name, city }, token
✓ User saved to database
✓ Password is hashed (not plain text)
```

### Test 1.2: Duplicate Email Signup
```
POST /api/auth/signup
{
  "email": "user1@example.com",
  "password": "SecurePass123!",
  "name": "Jane Doe"
}

Expected:
✓ Status: 400
✓ Response: { error: "..." } (generic message, NOT "Email already registered")
✓ No new user created
```

### Test 1.3: Weak Password Rejection
```
POST /api/auth/signup
{
  "email": "user2@example.com",
  "password": "weak",
  "name": "Test User"
}

Expected:
✓ Status: 400
✓ Response includes validation errors
✓ No user created
```

### Test 1.4: Invalid Email
```
POST /api/auth/signup
{
  "email": "not-an-email",
  "password": "SecurePass123!",
  "name": "Test User"
}

Expected:
✓ Status: 400
✓ Response: { errors: ["Valid email is required"] }
```

### Test 1.5: Login Success
```
POST /api/auth/login
{
  "email": "user1@example.com",
  "password": "SecurePass123!"
}

Expected:
✓ Status: 200
✓ Response includes: user object, valid JWT token
✓ Token can be decoded (not valid JWT throws error)
```

### Test 1.6: Login Wrong Password
```
POST /api/auth/login
{
  "email": "user1@example.com",
  "password": "WrongPassword"
}

Expected:
✓ Status: 401
✓ Response: { error: "Invalid credentials" }
✓ No token issued
```

### Test 1.7: Login Non-existent User
```
POST /api/auth/login
{
  "email": "nonexistent@example.com",
  "password": "AnyPassword123!"
}

Expected:
✓ Status: 401
✓ Response: { error: "Invalid credentials" } (generic, not "User not found")
```

### Test 1.8: Rate Limiting on Login
```
Send 6 failed login attempts in 15 minutes
5 attempts: ✓ Status: 401
6+ attempts: ✓ Status: 429 (Too Many Requests)
Response: { error: "Too many login attempts..." }
```

---

## Ads API Tests

### Test 2.1: Get All Ads (No Auth Required)
```
GET /api/ads

Expected:
✓ Status: 200
✓ Response: { ads: [], pagination: { page, limit, total, pages } }
✓ Ads include seller info (user: { name, phone, city })
```

### Test 2.2: Get Ads with Pagination
```
GET /api/ads?page=1&limit=5

Expected:
✓ Status: 200
✓ Response ads length ≤ 5
✓ pagination.total > 0
✓ pagination.pages = Math.ceil(total / limit)
```

### Test 2.3: Pagination Bounds
```
GET /api/ads?page=-1&limit=10000

Expected:
✓ Status: 200
✓ Actual page used: 1 (not -1)
✓ Actual limit used: 100 (capped, not 10000)
✓ No errors or 500 response
```

### Test 2.4: Filter by Category
```
GET /api/ads?category=CAR

Expected:
✓ Status: 200
✓ All ads have category: "CAR"
```

### Test 2.5: SQL Injection in Sort
```
GET /api/ads?sortBy='; DROP TABLE ads;--

Expected:
✓ Status: 200
✓ Ads returned (no database error)
✓ Results sorted by createdAt (default, safe fallback)
✓ Database intact, no tables dropped
```

### Test 2.6: Create Ad Without Auth
```
POST /api/ads
{
  "title": "Test Car",
  "make": "Toyota",
  "model": "Corolla",
  "city": "Lahore",
  "price": 5000000,
  "condition": "Used",
  "description": "Good condition"
}

Expected:
✓ Status: 401
✓ Response: { error: "Access token required" }
✓ Ad not created
```

### Test 2.7: Create Ad with Invalid Token
```
Header: Authorization: Bearer invalid_token
POST /api/ads
{ ... ad data ... }

Expected:
✓ Status: 401
✓ Response: { error: "Invalid or expired token" }
```

### Test 2.8: Create Ad with Valid Auth
```
Header: Authorization: Bearer <valid_jwt>
POST /api/ads
{
  "title": "Toyota Corolla",
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "city": "Lahore",
  "price": 5200000,
  "mileage": 15000,
  "condition": "Used",
  "description": "First owner, excellent condition"
}

Expected:
✓ Status: 201
✓ Ad created with userId matching JWT
✓ Ad includes all fields
✓ Ad returned in response
```

### Test 2.9: Missing Required Fields
```
POST /api/ads (with Authorization header)
{
  "title": "Test",
  "make": "Toyota"
  // missing: model, city, price, condition, description
}

Expected:
✓ Status: 400
✓ Response: { errors: [...] }
✗ Ad not created
```

### Test 2.10: Invalid Price
```
POST /api/ads (with Authorization header)
{
  "title": "Car",
  "make": "Toyota",
  "model": "Corolla",
  "city": "Lahore",
  "price": -1000,  // negative
  "condition": "Used",
  "description": "Test"
}

Expected:
✓ Status: 400
✓ Response includes validation error
✓ Ad not created
```

### Test 2.11: Get Single Ad
```
GET /api/ads/{valid_ad_id}

Expected:
✓ Status: 200
✓ Ad details returned
✓ User info included (seller details)
```

### Test 2.12: Get Non-existent Ad
```
GET /api/ads/invalid_id

Expected:
✓ Status: 404
✓ Response: { error: "Ad not found" }
```

### Test 2.13: Update Own Ad
```
PUT /api/ads/{ad_id}
Header: Authorization: Bearer <token_of_ad_owner>
{
  "price": 4800000,
  "description": "Updated description"
}

Expected:
✓ Status: 200
✓ Ad updated with new values
✓ Other fields unchanged
```

### Test 2.14: Update Someone Else's Ad
```
PUT /api/ads/{other_user_ad_id}
Header: Authorization: Bearer <your_token>
{
  "price": 1000000
}

Expected:
✓ Status: 403
✓ Response: { error: "Unauthorized: You can only edit your own ads" }
✓ Ad not modified
```

### Test 2.15: Delete Own Ad
```
DELETE /api/ads/{ad_id}
Header: Authorization: Bearer <token_of_ad_owner>

Expected:
✓ Status: 200
✓ Response: { message: "Ad deleted successfully" }
✓ GET /ads/{id} returns 404
```

### Test 2.16: Delete Someone Else's Ad
```
DELETE /api/ads/{other_user_ad_id}
Header: Authorization: Bearer <your_token>

Expected:
✓ Status: 403
✓ Response: { error: "Unauthorized..." }
✓ Ad not deleted
```

### Test 2.17: Get My Ads
```
GET /api/ads/user/my-ads
Header: Authorization: Bearer <valid_token>

Expected:
✓ Status: 200
✓ Only ads created by this user returned
✓ Ordered by most recent first
```

---

## Error Handling Tests

### Test 3.1: 404 Not Found
```
GET /api/nonexistent-route

Expected:
✓ Status: 404
✓ Response: { error: "Route not found" }
```

### Test 3.2: Invalid JSON
```
POST /api/auth/signup
Header: Content-Type: application/json
Body: { invalid json

Expected:
✓ Status: 400 (Bad Request)
✓ Response: { error: "..." }
✓ No 500 error
```

### Test 3.3: Request Timeout
```
Send request, then don't respond for > 5 seconds
(Requires frontend API client with timeout)

Expected:
✓ Response: { error: "Request timeout" }
✗ No hanging connections
```

---

## Security Tests

### Test 4.1: XSS Prevention
```
POST /api/ads (with auth)
{
  "title": "<script>alert('XSS')</script>",
  "make": "Toyota",
  "model": "<img src=x onerror='alert(1)'>",
  ...
}

Expected:
✓ Ad created successfully
✓ Script tags saved as-is (database stores verbatim)
✓ Frontend escapes on display (frontend responsibility)
✗ No XSS attack when viewing ad
```

### Test 4.2: CORS Headers
```
fetch('http://localhost:5000/api/ads', {
  headers: { 'Origin': 'http://attacker.com' }
})

Expected:
✓ Status: 200 (if origin matches CORS_ORIGIN)
✗ Status: 200 (if origin is different and CORS not set)
✓ Response-Header Access-Control-Allow-Origin set correctly
```

### Test 4.3: Token Expiry
```
Use a JWT with exp: (current time - 1)
GET /api/ads/user/my-ads
Header: Authorization: Bearer <expired_token>

Expected:
✓ Status: 401
✓ Response: { error: "Invalid or expired token" }
```

### Test 4.4: Missing Authorization Header
```
GET /api/ads/user/my-ads
(No Authorization header)

Expected:
✓ Status: 401
✓ Response: { error: "Access token required" }
```

---

## Performance Tests

### Test 5.1: Load 1000 Ads
```
Create 1000 ads in database
GET /api/ads?limit=10

Expected:
✓ Response time < 500ms
✓ Only 10 ads returned
✓ Pagination works correctly
```

### Test 5.2: Large Description
```
POST /api/ads (with auth)
{
  ...
  "description": "<10MB text>"
  ...
}

Expected:
✓ Status: 413 (Payload Too Large) if over 1MB
✗ Status: 201
```

---

## Test Coverage Summary

| Category | Tests | Status |
|----------|-------|--------|
| Authentication | 8 | ❌ Need to implement |
| Ads API | 17 | ❌ Need to implement |
| Error Handling | 3 | ❌ Need to implement |
| Security | 4 | ❌ Need to implement |
| Performance | 2 | ❌ Need to implement |
| **TOTAL** | **34** | **❌ NONE EXIST** |

**Current Test Coverage: 0%** ⚠️

---

## Run Tests

```bash
# Manual testing with curl
source ./test-suite.sh  # Create this file with curl tests

# Automated testing
npm install --save-dev jest supertest
npm test

# Load testing
npm install --save-dev artillery
artillery run load-test.yml
```

