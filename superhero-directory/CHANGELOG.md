# Changelog

## v0.0.1 - 08.05.2025
Added:
- `CHANGELOG.md` file to track project changes;
- `useDebounce` hook;
- `capitalize` util function;
- Search input component;
- Search superhero functionality;
- Search superhero feature component;
- Saving current search query to URL search params;
- Superhero info card to show found result;
- Proper `Content-Type` headers in request searching for a hero by name;
- 5 minutes of stale time setting to requests as the data isn't meant to change often;
- Link to main page in the header;
- Link to main page when hero with specified id not found;


Changed:
- `index.html` title tag;
- Renamed components' files to be compliant with FSD approach (kebab-case -> PascalCase);
- Changed existing file structure according to FSD approach;
- Decompositioned superhero's page;
- Rephrased thrown error message when fetching causes error to be more user friendly;
- Renamed query keys and removed excessive ones;

Fixed:
- `.gitignore` paths to correctly ignore `dist` and `node_modules` folders.

Removed:
- `StorybookQueryClientProvider` component as it is not needed in this project.

Todo:
- Change typings for some fields of `superhero` entity when API changes response from `"null"` string to a proper null value.
- Change API requests handling logic when API changes response to be HTTP standarts compliant (e.g. currently it would return code `200 OK` with response body of 
`{"response":"error","error":"invalid id"}`)