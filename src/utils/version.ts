/**
 * Version utility to generate version strings in format YYYYMMDD_deploymentCount_HHMM
 * Automatically generates based on current deployment time with deployment counting
 * Example: 20251211_01_1954 (December 11, 2025, 1st deployment at 19:54)
 */

// Simulate deployment tracking - in a real app, this would come from CI/CD or a deployment service
const getDeploymentCount = (dateStr: string): number => {
    // For demo purposes, we'll use localStorage to simulate deployment tracking
    // In a real environment, this would be managed by your CI/CD system

    if (typeof window !== 'undefined') {
        const storageKey = `deployment_${dateStr}`;
        const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);
        const newCount = currentCount + 1;
        localStorage.setItem(storageKey, newCount.toString());
        return newCount;
    }

    // Fallback for server-side or when localStorage isn't available
    return 1;
};

export const getVersion = (): string => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const dateStr = `${year}${month}${day}`;
    const deploymentCount = getDeploymentCount(dateStr);
    const deploymentCountStr = String(deploymentCount).padStart(2, '0');

    return `${dateStr}_${deploymentCountStr}_${hours}${minutes}`;
};

// Generate a static version for demo purposes (without incrementing counter)
export const getStaticVersion = (): string => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const dateStr = `${year}${month}${day}`;

    // Use a static deployment count for consistent display
    const deploymentCountStr = '01';

    return `${dateStr}_${deploymentCountStr}_${hours}${minutes}`;
};

export const getVersionDisplay = (): string => {
    return `v${getStaticVersion()}`;
};

// Parse version string to extract components
export const parseVersion = (version: string) => {
    const parts = version.replace('v', '').split('_');
    if (parts.length === 3) {
        const [datePart, deploymentPart, timePart] = parts;

        return {
            date: datePart,
            year: datePart.substring(0, 4),
            month: datePart.substring(4, 6),
            day: datePart.substring(6, 8),
            deploymentCount: parseInt(deploymentPart, 10),
            time: timePart,
            hours: timePart.substring(0, 2),
            minutes: timePart.substring(2, 4),
            formatted: {
                date: `${datePart.substring(0, 4)}-${datePart.substring(4, 6)}-${datePart.substring(6, 8)}`,
                time: `${timePart.substring(0, 2)}:${timePart.substring(2, 4)}`,
                deployment: `#${deploymentPart}`
            }
        };
    }

    return null;
};

// Build-time version generation for consistent versioning across the app
export const BUILD_VERSION = getStaticVersion();

// Demo version examples for documentation
export const VERSION_EXAMPLES = {
    basic: '20251211_01_1954',
    multipleDeployments: '20251211_03_2115',
    description: 'Format: YYYYMMDD_deploymentCount_HHMM'
};
