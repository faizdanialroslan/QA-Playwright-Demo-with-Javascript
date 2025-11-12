# Versioning System

## Format: `YYYYMMDD_deploymentCount_HHMM`

The application uses a comprehensive versioning system that tracks deployment information:

### Format Breakdown

- **YYYYMMDD**: Date of deployment (Year, Month, Day)
- **deploymentCount**: Number of deployments on that specific date (01, 02, 03, etc.)
- **HHMM**: Time of deployment in 24-hour format (Hours, Minutes)

### Examples

| Version | Explanation |
|---------|-------------|
| `20251211_01_1954` | December 11, 2025 - 1st deployment of the day at 19:54 (7:54 PM) |
| `20251211_02_2115` | December 11, 2025 - 2nd deployment of the day at 21:15 (9:15 PM) |
| `20251212_01_0830` | December 12, 2025 - 1st deployment of the day at 08:30 (8:30 AM) |

### Features

- **Automatic Generation**: Version is automatically generated at build/deployment time
- **Deployment Tracking**: Keeps count of deployments per day
- **Time Tracking**: Records exact time of deployment
- **Interactive Display**: Click on version number in TodoApp to see detailed breakdown

### Implementation

The versioning system is implemented in:
- `src/utils/version.ts` - Core version generation logic
- `src/components/Version.tsx` - UI component for displaying versions
- Used across all pages in the application

### Development vs Production

- **Development**: Uses localStorage to simulate deployment counting
- **Production**: Should integrate with CI/CD system for accurate deployment tracking

### Accessing Version Information

```typescript
import { BUILD_VERSION, parseVersion } from '../utils/version';

// Get current version
console.log(BUILD_VERSION); // e.g., "20251211_01_1954"

// Parse version for detailed info
const versionInfo = parseVersion(`v${BUILD_VERSION}`);
console.log(versionInfo?.formatted.date);       // "2025-12-11"
console.log(versionInfo?.formatted.time);       // "19:54"
console.log(versionInfo?.formatted.deployment); // "#01"
```

This versioning system provides clear deployment tracking and helps with:
- Issue debugging (know exact deployment time)
- Release management (track multiple deployments per day)
- Audit trails (deployment history)
- User support (users can report exact version)
