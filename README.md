Here's the trimmed README content starting from the cloning step:

```markdown
## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/my-comments-app.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd my-comments-app
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

To run the application in development mode, execute:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the application in action.

### Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will generate static files in the `dist` directory.

### Deploying the Application

To deploy the application to GitHub Pages:

1. **Ensure your build is complete:**
   ```bash
   npm run build
   ```

2. **Deploy using the gh-pages package:**
   ```bash
   npm run deploy
   ```

After deploying, your application will be available at:
```
https://yourusername.github.io/my-comments-app/
```
```
