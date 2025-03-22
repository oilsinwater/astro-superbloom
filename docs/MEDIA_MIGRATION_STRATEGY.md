# Media Migration Strategy

## Media Organization Structure

Based on the analysis of the existing Superbloom website media assets, we've identified the following organization structure for the new Strapi CMS:

### Directory Structure

```bash
/media
├── blog        # Blog post featured images and inline content
├── people      # Team member and contributor photos
├── projects    # Project images and assets
├── resources   # Resource images and downloadable files
├── events      # Event photos and promotional materials
├── site        # General site assets (logos, icons, UI elements)
└── legacy      # Archived content from the old site that needs preserving
```

## Naming Conventions

To ensure consistent and manageable media assets, we will implement the following naming conventions:

1. **All filenames should be lowercase**
2. **Use hyphens instead of spaces or underscores**
3. **Include content type prefix**:
   - `blog-{slug}-{descriptor}.{ext}`
   - `person-{name}-{descriptor}.{ext}`
   - `project-{slug}-{descriptor}.{ext}`
   - `resource-{slug}-{descriptor}.{ext}`
   - `event-{slug}-{descriptor}.{ext}`
   - `site-{section}-{descriptor}.{ext}`

4. **Include dimensions for icons and UI elements**:
   - `icon-{name}-{width}x{height}.{ext}`

## Image Transformations

The following transformations will be applied automatically:

1. **Responsive image sizes**:
   - small: 480px width
   - medium: 768px width
   - large: 1080px width
   - xlarge: 1920px width

2. **Image formats**:
   - Original format preservation
   - WebP conversion for improved performance
   - JPEG optimization for photos
   - PNG optimization for graphics with transparency

3. **Lazy loading implementation**:
   - All images will use native lazy loading via the `loading="lazy"` attribute
   - Critical above-the-fold images will be preloaded

## Migration Process

1. **Inventory all existing assets**
   - Create a spreadsheet tracking all media from the old site
   - Document current file path, size, and usage contexts

2. **Optimize legacy assets**
   - Run image optimization on all legacy files
   - Convert applicable images to WebP format
   - Update image dimensions to match responsive breakpoints

3. **Import to Strapi**
   - Upload assets to appropriate media library folders
   - Maintain metadata and alt text
   - Associate media with corresponding content items

4. **Quality assurance**
   - Verify all images are properly displayed
   - Confirm responsive behavior across device sizes
   - Test lazy loading performance
   - Validate WebP serving with fallbacks

## Implementation Checklist

- [ ] Set up media library folders in Strapi
- [ ] Create image transformation scripts
- [ ] Develop media import pipeline
- [ ] Configure alt text and metadata requirements
- [ ] Test responsive image delivery
- [ ] Document process for content editors
