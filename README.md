# Project Title

A brief description of your web application and its purpose.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contact](#contact)
7. [Future Improvements](#contact)

## Features

- useCachingFetch:
  - This hook is a custom React hook that simplifies data fetching with caching capabilities.
- preloadCachingFetch:
  - This function ensures data is fetched and stored in the cache for future use, avoiding redundant network requests
- serializeCache / initializeCache:
  - These two functions will help the framework transfer your cache to the browser

## Tech Stack

- **Frontend:** React, TypeScipt
- **Backend:** Mock Service Worker (https://github.com/mswjs/msw)
- **Testing:** React Testing Library Jest (https://testing-library.com/docs/react-testing-library/intro/)

## Getting Started

## Installation

##### Clone the repository

```bash
git clone https://github.com/yourusername/yourprojectname.git
```

##### Navigate to the project directory

```bash
cd yourprojectname
```

##### Install dependencies

```bash
npm install
```

##### Run the development server

```bash
npm start
```

## Usage

### useCachingFetch

- This hook ensures that previously fetched data is reused when available, preventing unnecessary network requests for the same URL. The hook fetches data, caches it, and returns the data, loading state, and any errors encountered during the fetch.

```bash
const { data, isLoading, error } = useCachingFetch('https://sample.api.com/data');
```

### preloadCachingFetch

- The preloadCachingFetch function preloads and caches data from a given URL. This function ensures that data is fetched and stored in the cache for future use, avoiding redundant network requests for the same resource. This function will be called once on the server before any rendering occurs.

```bash
preloadCachingFetch(url: string): Promise<void>
```

### serializeCache / initializeCache

- The serializeCache function is used to convert the current in-memory cache into a serialized JSON string.
- The initializeCache function restores the in-memory cache from a serialized JSON string.

```bash
serializeCache(): string
initializeCache(serializedCache: string): void
```

### Contact

Luis Santiago – luis.santiagoayala@gmail.com

### Next Steps

- Finish testing library configuration
- Logging and Monitoring: configure different logging levels for production and development
- Performance Optimization: Load components only when needed using React's React.lazy() to improve performance.
- Linter: ESLint to lint the codebase to catch potential bugs or style issues.
- CI/CD Pipeline

### Potential Issues

- Using a module-level cache like this can lead to problems in a server environment that handles multiple concurrent requests. Since the cache is shared across all requests, data from one user's request could potentially leak into another's.
- In a real-world application, we would need to scope the cache to individual requests. This could be done by using a context. In this case, the framework handles this concern, by clearing the cache between requests using wipeCache.
- In the current implementation, the caching library does not have expiration time or any form of invalidation strategy. This introduces potential issues in a real-world application like stale/outdated date or additional memory consumption.
