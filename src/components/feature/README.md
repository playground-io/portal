│   ├── **features/** (Components specific to a major feature or business logic)
│   │   ├── users/
│   │   │   └── UserProfileCard.vue
│   │   │   └── UserList.vue
│   │   ├── products/
│   │   │   └── ProductDetails.vue
│   │   │   └── AddToCartButton.vue

features/ (Feature/App Modules)
These are complex components that contain the business logic specific to a major feature. They are often composed of smaller core/ components. They are typically nested under their feature name (e.g., features/orders/OrderList.vue).

Role: Implement specific application functionalities.

Examples: UserProfileForm.vue, ShoppingCartSummary.vue, LoginWidget.vue.