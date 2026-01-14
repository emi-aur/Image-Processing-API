# Image Processing API

## Description
An API for processing images with resizing capabilities. Images are cached after first creation to improve performance.

## Installation
```
npm install
```

## Scripts

### Start the Development Server
```
npm start
```
Starts the server on http://localhost:3000 using nodemon for auto-reload.

### Build the Project
```
npm run build
```
Compiles TypeScript to JavaScript in the `dist/` folder.

### Run Tests
```
npm test
```
Builds the project and runs all Jasmine tests.

### Linting
```
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
```

### Format Code
```
npm run prettier
```

## Endpoints

### Image Processing Endpoint 1
**URL:** `GET /api/images

**Query Parameters:**
- `filename` (required): Name of the image file (e.g., `icelandwaterfall.jpg`)
- `width` (optional): Width in pixels (default: 200)
- `height` (optional): Height in pixels (default: 200)

**Example:**
```
http://localhost:3000/api/image_1?filename=icelandwaterfall.jpg&width=500&height=500
```

**Available Images:**
- icelandwaterfall.jpg
- palmtunnel.jpg
- santamonica.jpg


## Functionality

### Caching
- Resized images are cached in `src/assets/thumb/` folder
- On first request, the image is processed and saved
- Subsequent requests serve the cached version
- To test caching: Delete a thumbnail from `src/assets/thumb/` and make the same request again - it will be recreated

### Error Handling
- Returns 404 if the original image is not found
- Returns 500 if image processing fails

### Image Processing
- Uses Sharp library for high-performance image resizing
- Supports custom width and height parameters
- Creates thumbnail directory automatically if it doesn't exist

## Project Structure
```
src/
  ├── index.ts                 # Main application entry point
  ├── routes/
  │   ├── index.ts            # Route definitions
  │   └── api/
  │       ├── images.ts      # Image processing endpoint 
  │       
  ├── assets/
  │   ├── full/               # Original images
  │   └── thumb/              # Cached thumbnails
  └── tests/
      └── indexSpec.ts        # API tests
```

## Testing
Run `npm test` to execute all tests. Tests verify:
- Endpoint returns 200 for valid requests
- Images are properly resized and cached
- Error handling for missing files
