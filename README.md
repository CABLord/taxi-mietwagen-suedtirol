
# Taxi & Mietwagen Südtirol

This project is a taxi and car rental booking system for Südtirol (South Tyrol). It features a user-friendly interface with internationalization support for German and English languages.

## Internationalization Tutorial

This guide will help you understand how internationalization is implemented in this project and how to extend it for new features or additional languages.

### 1. Setup

The project uses `react-intl` for internationalization. Make sure it's installed in your project:

```bash
npm install react-intl
```

### 2. Language Files

Language-specific strings are stored in JSON files:

- `en.json` for English
- `de.json` for German

These files are located in the root directory of the project.

To add a new translation:

1. Open both `en.json` and `de.json`.
2. Add a new key-value pair in both files:

   ```json
   {
     "existingKey": "Existing translation",
     "newKey": "New translation"
   }
   ```

3. Provide the appropriate translation for each language.

### 3. Using Translations in Components

To use translations in your React components:

1. Import necessary components and hooks:

   ```typescript
   import { useIntl, FormattedMessage } from 'react-intl';
   ```

2. Use `FormattedMessage` for inline translations:

   ```tsx
   <h2><FormattedMessage id="bookRide" /></h2>
   ```

3. Use `useIntl` hook for dynamic values or non-JSX contexts:

   ```typescript
   const intl = useIntl();
   const placeholderText = intl.formatMessage({ id: 'enterName' });
   ```

### 4. Adding a New Language

To add support for a new language:

1. Create a new JSON file for the language (e.g., `fr.json` for French).
2. Copy the content from `en.json` and translate all values to the new language.
3. Update the `LanguageContext.tsx` file:

   ```typescript
   import fr from '../fr.json';
   
   const languages: { [key: string]: any } = { en, de, fr };
   ```

4. Update any language selection UI to include the new language option.

### 5. Best Practices

- Keep translation keys descriptive and consistent.
- Use placeholders for dynamic content: 
  ```json
  "welcome": "Welcome, {name}!"
  ```
  Then use it like this:
  ```tsx
  <FormattedMessage id="welcome" values={{ name: userName }} />
  ```
- Group related translations using nested objects if your translation library supports it.
- Regularly review and update translations as the application evolves.

### 6. Testing Internationalization

To test the internationalization:

1. Run the application locally.
2. Switch between available languages.
3. Verify that all text elements change according to the selected language.
4. Test form submissions and error messages to ensure they're correctly translated.
5. Check that dynamically generated content (like placeholders) is correctly translated.

## Contributing

When adding new features or modifying existing ones, please ensure that you:

1. Add any new text as keys in all language files.
2. Use `FormattedMessage` or `useIntl` for all user-facing strings.
3. Update this README if you make any changes to the internationalization system.

For any questions or issues related to internationalization, please open an issue in the project repository.
