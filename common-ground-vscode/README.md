# Common Ground MVP

Open this folder in VS Code and edit the three files:

- index.html: page structure
- styles.css: layout and visual design
- app.js: interactions and demo data

## Run it locally

Quickest: install the VS Code Live Server extension, right-click index.html, then choose **Open with Live Server**. Or open index.html directly in a browser.

You can also serve it from the command line:

```bash
cd "c:\Users\ga53pic\OneDrive - TUM\EIT\Course_EntrepreneurshipInnovationModules\InnovationPitch"
python -m http.server 8000 --bind 0.0.0.0
```

Then open:

- http://127.0.0.1:8000/common-ground-vscode/
- or the machine IP such as http://192.168.x.x:8000/common-ground-vscode/

## Publish it publicly

This app is static HTML/CSS/JS, so it is ready for Netlify or similar hosting.

1. Push this project to a GitHub repository.
2. Import the repository into Netlify.
3. Set the publish directory to `common-ground-vscode`.
4. Deploy.

A Netlify config is already included at the project root in `netlify.toml`.

The resident app and City workspace share demo data in the same browser via localStorage. The map and scenario values are illustrative. This prototype has no server, real authentication, or cross-device database.
