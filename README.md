# Documentation Viewer and Editor

This project is a simple documentation viewer and editor app built with React and TypeScript. It allows you to load documentation from a JSON URL, view and edit the documentation, and export the edited documentation as JSON.

## Features

- Load documentation from a JSON URL
- View documentation with a menu and main content area
- Edit documentation with a markdown editor
- Export edited documentation as JSON
- URL routing for selected pages
- Add and remove pages

## Setup and Run

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/document-viewer-editor.git
   cd document-viewer-editor
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

1. Start the development server:

   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

1. Build the app for production:

   ```bash
   npm run build
   ```

2. The build artifacts will be stored in the `build` folder. You can deploy the contents of this folder to your web server.

### Project Structure

- `src/`: Contains the source code of the app
  - `components/`: Contains reusable React components
  - `pages/`: Contains the main pages of the app
  - `App.tsx`: The main app component
  - `index.tsx`: The entry point of the app
- `public/`: Contains static assets and the HTML template
- `README.md`: This file

### Example JSON URL

You can use the following example JSON URL to test the app:

```
https://gist.githubusercontent.com/thehappybug/65a466dcdb0908767057b80f0cb7ea5d/raw/6f10747c5feb7ce91b83392f2cee23ae06b20fe6/doc.json
https://gist.githubusercontent.com/Saad-Qayyum-9/b674a219a47730e4dfc52ce65439e758/raw/1f430c5ef54e2929eca2ded25695d33f60792581/gistfile1.json
```

### License

This project is licensed under the MIT License.
