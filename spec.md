# Welkee — Royal Golden UI Upgrade

## Current State
- BikesSection uses 🏙️ emoji for Bikes header, Scooters uses 🛵
- Text colors use standard gray/blue palette
- No custom background image applied
- '50 real vehicles' count visible to all users on HomePage
- Uploaded background image exists at /assets/6c393cb3-1655-4440-b7d7-67b17341316a-019d51e4-ee0f-7297-84b7-d1400808961a.jpeg

## Requested Changes (Diff)

### Add
- Fixed background image across entire site using uploaded JPEG
- Gold (#FFD700) color applied to primary text: vehicle names, prices, section headings
- Overlay layer on background for readability

### Modify
- HomePage: Bikes section header emoji from 🏙️ to 🏍️ (motorcycle)
- HomePage: '50 real vehicles' paragraph — hide from guests, show only when isSuperAdmin
- VehicleCard: vehicle name text color → gold (#FFD700)
- VehicleCard: price text color → gold (#FFD700)
- AllVehiclesPage: headings color → gold
- index.css: add global body background-image with fixed attachment and dark overlay

### Remove
- Nothing removed

## Implementation Plan
1. Update index.css — add fixed background image + dark overlay for readability
2. Update HomePage.tsx — change 🏙️ to 🏍️, conditionally show '50 real vehicles' to admin only
3. Update VehicleCard.tsx — change vehicle name and price to #FFD700 gold
4. Update AllVehiclesPage.tsx — change headings to gold
5. Pass isSuperAdmin to HomePage via App.tsx
