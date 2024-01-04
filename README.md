# cooking-home-frontend
***Cooking Home*** offers users an extensive ***recipe search engine*** and ***recommends recipes*** based on their favorite foods and the ingredients they have at home.

***cooking-home-frontend*** repository contains the frontend-side codebase of the ***Cooking Home*** application.

> Client URL: [https://cooking-home.kro.kr](https://cooking-home.kro.kr)

> github/cooking-home-backend: [https://github.com/kohdc1723/cooking-home-backend](https://github.com/kohdc1723/cooking-home-backend)

---
---

# Tech stack
### Built with
![javascript-logo]
![react-logo]
![tailwindcss-logo]
![mui-logo]
![redux-logo]
![edamam-logo]

### CI/CD with
![s3-logo]
![cloudfront-logo]
![route53-logo]
![github-actions-logo]

---
---

# File structure
    .
    ├── public                                      # static files
    │   ├── favicon.ico                             # favicon
    │   ├── index.html                              # main HTML file
    │   ├── logo192.png                             # image for small screen
    │   ├── logo512.png                             # image for large screen
    │   ├── manifest.json                           # manifest file for progressive web
    │   └── robots.txt                              # file for the web crawlers
    │
    ├── src                                         # source code for the react app
    │   ├── app                                     # app folder
    │   │   ├── api                                 # api slices
    │   │   │   ├── apiSlice.js                     # redux api slice for cooking-home-backend
    │   │   │   └── edamamApiSlice.js               # redux api slice for Edamam
    │   │   │
    │   │   └── store.js                            # redux store configuration
    │   │
    │   ├── components                              # reusable react components
    │   │   ├── DropdownButton.jsx                  # DropdownButton component
    │   │   ├── Footer.jsx                          # Footer component
    │   │   ├── Header.jsx                          # Header component
    │   │   ├── Layout.jsx                          # Layout component
    │   │   ├── Welcome.jsx                         # Welcome component
    │   │   └── index.js                            # exporting components
    │   │
    │   ├── constants                               # constants folder
    │   │   └── labels.js                           # labels for the recipe search filter
    │   │
    │   ├── features                                # features folder
    │   │   ├── auth                                # features related to authentication
    │   │   │   ├── components                      # components related to authentication
    │   │   │   │   ├── AuthBotton.jsx              # AuthButton component
    │   │   │   │   ├── Login.jsx                   # Login component
    │   │   │   │   ├── PersistLogin.jsx            # PersistLogin component
    │   │   │   │   ├── RequireAuth.jsx             # RequireAuth component
    │   │   │   │   └── index.js                    # exporting components
    │   │   │   │
    │   │   │   ├── authApiSlice.js                 # redux api slice for auth feature
    │   │   │   └── authSlice.js                    # redux slice for auth states
    │   │   │
    │   │   ├── preference                          # features related to preference
    │   │   │   ├── components                      # components related to preference
    │   │   │   │   ├── NewPreference.jsx           # NewPreference component
    │   │   │   │   ├── PreferenceSetting.jsx       # PreferenceSetting component
    │   │   │   │   ├── PreferenceSettingForm.jsx   # PreferenceSettingForm component
    │   │   │   │   └── index.js                    # exporting components
    │   │   │   │
    │   │   │   └── preferenceApiSlice.js           # redux api slice for preference feature
    │   │   │
    │   │   ├── recipe                              # features related to recipe
    │   │   │   ├── components                      # components related to recipe
    │   │   │   │   ├── MultipleSelect.jsx          # MultipleSelect component
    │   │   │   │   ├── RecipeCard.jsx              # RecipeCard component
    │   │   │   │   ├── RecipeDetail.jsx            # RecipeDetail component
    │   │   │   │   ├── RecipeFinder.jsx            # RecipeFinder component
    │   │   │   │   ├── RecipeResult.jsx            # RecipeResult component
    │   │   │   │   ├── RecipeSuggest.jsx           # RecipeSuggest component
    │   │   │   │   ├── SingleSelect.jsx            # SingleSelect component
    │   │   │   │   ├── SuggestCard.jsx             # SuggestCard component
    │   │   │   │   ├── SuggestContainer.jsx        # SuggestContainer component
    │   │   │   │   └── index.js                    # exporting components
    │   │   │   │
    │   │   │   ├── searchApiSlice.js               # redux api slice for search feature
    │   │   │   ├── searchParamsSlice.js            # redux slice for search parameters states
    │   │   │   └── suggestApiSlice.js              # redux api slice for suggest feature
    │   │   │
    │   │   └── users                               # features related to users
    │   │       ├── components                      # components related to users
    │   │       │   ├── AccountSetting.jsx          # AccountSetting component
    │   │       │   ├── AccountSettingForm.jsx      # AccountSettingForm component
    │   │       │   ├── Profile.jsx                 # Profile component
    │   │       │   ├── Register.jsx                # Register component
    │   │       │   └── index.js                    # exporting components
    │   │       │
    │   │       └── usersApiSlice.js                # redux api slice for users feature
    │   │
    │   ├── hooks                                   # custom hooks
    │   │   ├── useAuth.js                          # handling authentication
    │   │   ├── useLocalStorage.js                  # handling local storage
    │   │   ├── usePersist.js                       # handling login persistence
    │   │   └── useQueryString.js                   # handling query strings
    │   │
    │   ├── images                                  # images folder
    │   │   ├── logo.png                            # Cooking Home logo image
    │   │   ├── welcome-primary.png                 # image for welcome page
    │   │   └── welcome-secondary.png               # image for welcome page
    │   │
    │   ├── styles                                  # styles folder
    │   │   └── muiCustomStyles.js                  # custom styles for Material UI
    │   │
    │   ├── utils                                   # utility functions
    │   │   └── recipeApiUtils.js                   # utility functions related to recipe search
    │   │
    │   ├── App.jsx                                 # root component
    │   ├── index.css                               # global css
    │   └── index.js                                # entry point for rendering react app
    │
    ├── tailwind.config.js                          # configuration for Tailwind CSS
    ├── .gitignore                                  # gitignore file
    └── README.md                                   # README file

---
---

# Screenshots

## Welcome Page
- The landing page.

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/1febd087-f45e-4ef1-9625-705969dfafeb">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/95113d88-f906-4d28-83ad-a9004ad4e977">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/f8455ed9-964a-4222-9b05-af37c2fe7395">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/3c92341c-7648-4960-9678-77d7d0430a18">

---

## RecipeFinder Page
- RecipeFinder Page provides extensive recipe search engine powered by Edamam API.
- The search engine utilizes the URL querystring parameters.

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/31c46a09-7de8-4fae-9dab-ac1adc3c3802">
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/16227ab4-6aa7-4797-9a15-6144a398e8a1">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/96bb5305-cbee-4ea8-af36-b09cd504d544">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/db5415d1-07b1-4664-886e-3df700475bb5">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/8bb4284e-696c-47b4-86c8-52b4e2c13be8">

---

## RecipeSuggest Page
- RecipeSuggest Page offers recipe recommendations based on users' favorite food and ingredients they have at home.

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/0641097c-f550-4445-a304-33966e2c8d01">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/208b1135-a6f0-4707-8457-891497265530">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/a3306b4f-baac-4709-a048-6708d221c53b">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/6c303289-3a59-400b-bb4a-d07dd311d0f4">

---

## Login Page
- Users can login to the service.

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/3fa024e5-aaf1-4cc0-8d7a-af13ddde0477">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/8b976443-ff67-40c2-adaf-3f1eaf10e4cc">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/27d21bad-43f8-4f89-a215-d66f21174b72">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/56a52e48-4f56-4628-b68d-39ad58deaa91">

---

## Register Page
- Users can create a new account.
- Register Page provides detailed feedback messages.

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/5288f117-6d82-47d8-8df3-43a152141234">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/00437a13-2cc3-489c-a0e0-970881cba2eb">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/a55968b2-184a-45e1-9902-fa641d6a6877">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/c68fa270-274b-4856-9e3b-ea64845db809">

---

## Profile Page
- Users can change user information (username, password)
- Users can change user preference (favorites, ingredients) which will be used for recipe recommendations

### Desktop
<img width="1200" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/01aa5978-010f-4e2c-a13e-4fb20b8e578c">

### Mobile
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/a09526c6-0eeb-4c68-8591-cc4c324e6997">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/768b80e9-79ec-4df7-9646-17fdaf0f5995">
<img width="273" alt="image" src="https://github.com/kohdc1723/cooking-home-frontend/assets/80452136/60ef03b1-6fb6-4d37-80fd-3e5ea1c22626">

---
---

[javascript-logo]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[route53-logo]: https://img.shields.io/badge/Amazon%20Route53-8C4FFF?style=for-the-badge&logo=amazonroute53&logoColor=white
[github-actions-logo]: https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white
[react-logo]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black
[redux-logo]: https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white
[s3-logo]: https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white
[cloudfront-logo]: https://img.shields.io/badge/Amazon%20CloudFront-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white
[mui-logo]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[tailwindcss-logo]: https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[edamam-logo]: https://img.shields.io/badge/Edamam%20API-6ACC00?style=for-the-badge&logoColor=white
