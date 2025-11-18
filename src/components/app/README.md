├── components/
│   ├── **app/** (Optional: For global wrapper/entry components)
│   │   └── AppHeader.vue
│   │   └── AppFooter.vue
│   │   └── MainLayout.vue

2. /components/app or /components/layoutThis specific sub-folder holds components that define the global, high-level structure of the application. They are crucial for consistent navigation and scaffolding.Role: These components provide the constant elements that persist across most, or all, pages. They wrap the content provided by the /views.Reusability: High. Used by almost every route/view.Examples: Global headers, footers, sidebars, and main structural wrappers.Examplesrc/
└── **components/**
    ├── **app/** (or **layout/**)
    │   ├── AppHeader.vue     <-- Contains navigation links
    │   ├── AppFooter.vue     <-- Contains copyright info
    │   └── MainLayout.vue    <-- Wraps the router view
    ├── core/                 <-- Button, Input, Card
    └── features/             <-- Complex widgets
🤝 Relationship SummaryFeature/views/components/app (or /layout)PurposeDefines a whole Page (Route).Defines the Global Structure (Scaffolding).Data LogicHandles main data fetching for the page.Mostly presentation; handles layout state (e.g., sidebar open/closed).ReusabilityLow (Specific to one route).High (Used across all or most routes).Use CaseHomeView combines AppHeader, a list, and a Button.AppHeader is used inside MainLayout, which wraps all views.