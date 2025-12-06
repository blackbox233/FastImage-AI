[33m0fdfbe6[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m Merge branch 'function-test'
[33m9678f01[m feat: implement dimension constraints in GenerateSection to ensure image sizes remain within specified limits while maintaining aspect ratio
[33mbe755b3[m feat: add Z-Image-Turbo model configuration to GenerateSection for enhanced image generation options
[33m6da7cfa[m refactor: rearrange AvatarProvider and PointsProvider in layout for improved context management and integrate points refresh in AvatarProvider
[33mdefc415[m refactor: remove points balance fetching logic from ProfilePage and integrate points display in Navbar for logged-in users
[33m50f837e[m chore: update environment variables and improve user experience by refining placeholder text and optimizing code structure
[33mff2fee7[m refactor: remove unnecessary logging from generateImage and setFlux2T2IorkflowParams functions to clean up code
[33mc5ac9a3[m feat: add PointsConsumeRanking component and API for fetching user points consumption ranking with time range filtering
[33mbe9e85c[m feat: update PointsTotalRanking to include user roles and enhance ranking fetch logic with cache-busting timestamp
[33m1c52e13[m feat: add PointsTotalRanking component and API for fetching user points ranking, integrating it into PointsAdminPage
[33m679b5e0[m feat: implement PointsAdminPage for managing user points, including admin checks and avatar handling
[33m4bead47[m feat: add Z-Image-Turbo model configuration to GenerateForm component
[33mc80c7e8[m feat: improve error handling and validation in setFlux2T2IorkflowParams function, ensuring all required nodes exist and have correct types
[33m425fff3[m feat: enhance generateImage function with additional logging for Flux-2 model, including request body size and workflow node details
[33m40d4c2d[m feat: add new models Z-Image-Turbo and Flux-2 with corresponding configurations, workflows, and images
[33m9aad910[m feat: add login prompt for workflows page when user is not authenticated and update Navbar to allow all users access to workflows
[33m8a5733a[m feat: enhance workflows page with loading state for repair cost and default value handling
[33m7d9cdc7[m feat: integrate PointsContext for managing user points balance and update relevant components to reflect changes
[33m49c27d7[m feat: add points balance display and fetching logic to Navbar component for user feedback
[33me53cd71[m refactor: update user access permissions in workflow menu to allow all logged-in users visibility
[33m7ad5736[m refactor: update user access permissions in admin check API to allow all logged-in users to query their status
[33m00544ea[m fix: update daily points values for regular and premium users and refine UI text for daily award notifications
[33maaec2a7[m feat: implement points management system with user points tracking, daily awards, and workflow repair cost integration
[33m575f732[m refactor: remove unused signUp import from AuthModal component to streamline authentication logic
[33m70e0e58[m feat: update web version to v2.3.1 for improved features and performance
[33m5bfd52e[m feat: implement dynamic API token validation for user registration and email domain validation, enhancing security in authentication flow
[33mfeee764[m feat: implement user quota management by adding API endpoint and integrating quota display in profile page
[33md3cfe1a[m feat: add email type filtering and dropdown management in admin page, including fetching allowed email domains
[33mdb1a986[m feat: implement email domain validation for user registration and update error handling in authentication flow
[33m3c489ba[m feat: implement email domain management feature with CRUD operations and validation for user registration
[33m16b04e7[m Merge branch 'main' of github.com:LastLighter/Dreamifly
[33mbc2b3da[m Merge branch 'function-test'
[33m1929d6f[m feat: update web version to v2.2.9 and increase unauthenticated user delay to 40 seconds for improved user experience
[33m3c11011[m feat: add active user and IP count metrics to analytics page and API for enhanced reporting capabilities
[33m6cb2936[m feat: add 'yesterday' time range option to analytics page and update related data handling in API routes for improved reporting accuracy
[33ma244e74[m feat: enhance admin status check by implementing dynamic token generation and adding delay for redirection to improve user experience
[33m288ca35[m Merge pull request #45 from Takamiya086/takamiya086-fix-rounded-3xl
[33m3c53540[m fix: only add a class "rounded-3xl"
[33mc865ce9[m fix: update file input accept attribute to specify allowed image formats (.png, .jpg, .jpeg) for improved user experience
[33m6de4459[m feat: update web version to v2.2.8, implement workflows for image repair, and enhance user permissions check for admin and premium users
[33mce719cc[m feat: enhance crawler analysis API by adding end date handling for time ranges and refactoring date calculations for improved accuracy
[33mf7b20ef[m feat: update web version to v2.2.6, enhance crawler analysis with user identity and daily limit features, and improve API for user limit configuration
[33ma359590[m feat: update web version to v2.2.5
[33ma08f1b7[m feat: convert last_request_reset_date to timestamptz and adjust timestamps for accurate timezone handling
[33m432bca0[m feat: add 'yesterday' time range option to crawler analysis and update related date handling in API routes
[33ma6e4b19[m refactor: remove backend version API endpoint and simplify VersionDisplay component by eliminating version mismatch handling
[33m2ec6037[m feat: update web version to v2.2.4, add backend version API endpoint, and enhance VersionDisplay component to show version mismatch alerts
[33m6c14951[m feat: implement CreateClient component for generating content, update HomeClient to navigate to creation page, and refactor GenerateSection to accept initial prompt
[33me56cd42[m Merge branch 'function-test'
[33mba52f84[m feat: update web version to v2.2.3, add avatar frame management features including CRUD operations, and integrate avatar frame selection in user profile and admin pages
[33mb05c421[m feat: update web version to v2.2.2, add avatar cropping functionality with support for GIFs, and enhance profile page with new avatar cropper component
[33m9247048[m feat: increment web version to v2.2.1 and improve IP concurrency management for both authenticated and unauthenticated users in API route
[33m4321fdb[m feat: update web version to v2.2.0 and enhance IP concurrency management for unauthenticated users in API route
[33mff29460[m feat: add max hourly call count metric for unauthenticated users in crawler analysis and update web version to v2.1.9
[33m354279d[m chore: update base URL in .env file to point to the new production environment
[33mf4f201a[m feat: add sorting and filtering options for user management in admin page, update API to support new parameters, and increment web version to v2.1.8
[33mac93f39[m chore: update web version to v2.1.7 and change variable declarations to const in crawler analysis route
[33m5159039[m feat: add user count metric to crawler analysis for authenticated users and update table structure accordingly
[33m8c6dead[m feat: enhance crawler analysis with daily and hourly distribution data for the past week, including support for authenticated and unauthenticated user metrics
[33m218b659[m chore: update base URL in .env file to point to production environment
[33m9eb64a6[m refactor: remove unused refreshIPBlacklist function and update variable declaration for query in IP blacklist route
[33mb9442d3[m feat: implement IP blacklist management with CRUD operations and admin interface
[33m9b4bdd6[m fix: simplify error message styling in reset password feedback component
[33me727086[m fix: enhance reset password feedback by updating status handling for error and form messages
[33mbe4cdfe[m chore: update web version to v2.1.5, implement reset password functionality with validation and user feedback
[33m7758c30[m chore: update web version to v2.1.4, display version in footer, and fix copyright message formatting in Chinese
[33maeae782[m refactor: improve IP concurrency management by separating concurrency check and increment logic, ensuring clearer handling of request limits
[33m6c22737[m chore: update web version to v2.1.3, add IP concurrency management for enhanced request handling, and implement settings page for user limit configuration
[33m09ad89c[m refactor: simplify encodeImageToBase64 function by removing mimeType parameter and add safety check for empty moderation results
[33mf479f70[m chore: remove .env file and add it to .gitignore to prevent tracking of sensitive information
[33m0e81b04[m chore: update web version to v2.1.2
[33ma7bdf3e[m chore: remove deprecated env.example file and add OpenAI dependency for avatar moderation
[33m29585f2[m chore: update web version to v2.1.1
[33m464dd16[m refactor: update daily request count reset logic to use Shanghai timezone for accurate date comparisons
[33m6c9214c[m refactor: standardize last login timestamp handling to UTC and enhance date formatting in admin page
[33m15ea872[m chore: update web version to v2.1.0 and refactor date handling in crawler analysis API to use UTC for consistency
[33mbfe1d04[m refactor: update date handling in getTimeRangeDate function to use UTC for consistency across time ranges
[33mefb5bfc[m chore: update web version to v2.0.9, enhance last login timestamp handling, and improve date formatting in admin page
[33m55b8be0[m refactor: remove unnecessary loading state and streamline user limit fetching in admin page
[33m2c30009[m feat: update web version to v2.0.8 and implement custom dialog for user interactions in admin page
[33me9dec9a[m feat: add user daily limit configuration with admin controls and update UI for limit settings
[33md7a4cd5[m fix: add timestamp to API requests in admin page to prevent caching
[33m286b0cb[m feat: add premium user functionality with daily request limits and admin controls for user roles
[33m54d9c55[m refactor: simplify request handling in update-last-login API and improve batch size adjustment UI for authenticated users
[33m512b799[m feat: enhance admin sidebar with mobile menu functionality and improve layout for better responsiveness
[33mb289d4b[m feat: add batch size adjustment for authenticated users and enforce minimum batch size for unauthenticated users
[33mbcdb5fa[m feat: implement last login time update functionality for users and enhance analytics page with hourly data support
[33m33923d8[m feat: extend time range options in analytics and crawler analysis pages to include hourly data, updating related API logic and UI components
[33m4f41fe8[m chore: update web version in environment variables from v2.0.4 to v2.0.5
[33m7a0aa2c[m feat: implement dynamic API token generation with server time support
[33m63bd4b9[m chore: update web version in environment variables from v2.0.3 to v2.0.4
[33mda5b8e0[m refactor: optimize crawler analysis page by using useCallback for modal handling and improve data filtering in API response
[33mdc2518f[m feat: enhance analytics and crawler analysis pages with total statistics and user tracking features
[33m2098e0f[m feat: add IP address tracking and crawler analysis features to admin panel
[33m3be7f5d[m fix: provide a placeholder connection string for empty DATABASE_URL during build
[33m643b767[m refactor: encapsulate database connection string logic in a function and add error handling for missing DATABASE_URL
[33m80230f7[m chore: update environment variables, enhance build process, and add 404 not found page
[33m8bc8882[m feat: enhance analytics page with caching and real-time data synchronization
[33m5590f9d[m feat: add model usage statistics tracking and integrate recharts for analytics visualization
[33m49ca671[m feat: implement admin panel with user management and analytics features
[33mee217c4[m fix: enhance email verification error handling and resend functionality
[33mb5424fb[m fix: update error message for unsupported reference image uploads
[33mca8d48c[m fix
[33m3f56e82[m fix ads
[33m4288aaa[m fix
[33m306db1d[m fix
[33md10c184[m fix
[33m692df09[m fix
[33me24fe9d[m fix
[33ma7d64f7[m fix
[33mb9fca45[m fix
[33m30fb71a[m chore: add delay for unauthenticated user loading time in environment variables
[33me7c6717[m chore: update web version in environment variables and enhance loading indicators in PromptInput component
[33md74632e[m refactor: remove concurrency error handling from PromptInput and GenerateSection components
[33mb797b5e[m feat: implement concurrency management for authenticated requests
[33m19df7a3[m feat: implement user queuing for unauthenticated requests and add rate limiting configuration
[33md7ac2dc[m refactor: remove unused updateNickname function and clean up dependencies in AvatarContext
[33mb8d2360[m feat: add version display component and update environment variables for versioning
[33m82765c1[m docs: update README with environment variable explanations
[33m63235d1[m feat(profile, navbar): sync avatar/nickname on save; fix refresh fallback
[33m2533035[m feat: add AvatarContext for global avatar state management and update Navbar and ProfilePage components
[33m42ba613[m feat(ProfilePage): update user data on session change and reset avatar preview on save
[33m8108ed8[m feat(ProfilePage): add avatar upload functionality and preview
[33m50255cc[m feat: integrate Ali OSS for file uploads and management
[33mc6899df[m feat(Navbar): enhance navigation handling and smooth scrolling
[33m7428232[m fix
[33m7be98ca[m fix
[33m25d543d[m fix build
[33mbb1fd31[m fix login
[33md3f3290[m fix
[33m1c6f15a[m fix
[33m75a3f8d[m fix
[33m3c9e230[m fix baseurl
[33m3657023[m fix image limit
[33m791748b[m fix
[33md8c2ec3[m fix env
[33m45f84c4[m fix
[33mb2214c4[m bearer
[33mc81091d[m fix
[33me9af411[m login and limit
[33m60c59de[m add ad txt
[33m53e3f12[m fix link
[33m1994281[m manbo link
[33md2128a3[m fix readme
[33m7af4cf3[m fix division
[33mcb41ce5[m qwen edit fix
[33m0f0dc18[m 编辑dockerfile
[33m2384af1[m fix readme
[33m59e1a87[m fix readme and add github icon
[33m53cf560[m enable dockerfile
[33m955e3cf[m fix model shift
[33m984f6b9[m first commit
