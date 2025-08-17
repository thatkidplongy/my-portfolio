# Profile Image Setup Guide

## How to Add Your Profile Image

### Option 1: Add to Public Folder (Recommended)

1. **Prepare your image:**
   - Use a high-quality, square image (recommended: 800x800px or larger)
   - Supported formats: JPG, PNG, WebP
   - Keep file size under 1MB for optimal performance

2. **Add the image:**
   - Place your image file in the `public/` folder
   - Name it `profile-image.jpg` (or update the src in the code)
   - The path should be: `public/profile-image.jpg`

3. **Update the code (if using different filename):**
   ```tsx
   <Image
     src="/your-filename.jpg"  // Update this line
     alt="Your Name - Your Title"
     fill
     className="object-cover"
     priority
   />
   ```

### Option 2: Use Remote URL

If you have an image hosted online:

```tsx
<Image
  src="https://your-domain.com/your-image.jpg"
  alt="Your Name - Your Title"
  fill
  className="object-cover"
  priority
/>
```

### Option 3: Import Image Directly

1. **Place image in src folder:**
   - Create `src/assets/` folder
   - Add your image there

2. **Import and use:**
   ```tsx
   import profileImage from '@/assets/your-image.jpg';
   
   <Image
     src={profileImage}
     alt="Your Name - Your Title"
     fill
     className="object-cover"
     priority
   />
   ```

## Current Implementation

The component now:
- ✅ Uses Next.js Image component for optimal performance
- ✅ Has a fallback emoji that shows on hover
- ✅ Maintains all the beautiful animations
- ✅ Is responsive and accessible
- ✅ Has proper alt text for screen readers

## Image Requirements

- **Aspect ratio:** Square (1:1) recommended
- **Resolution:** 800x800px minimum, 1200x1200px optimal
- **Format:** JPG, PNG, or WebP
- **File size:** Under 1MB for best performance
- **Content:** Professional headshot or avatar

## Troubleshooting

If the image doesn't show:
1. Check the file path is correct
2. Ensure the image file exists in the specified location
3. Check the browser console for any errors
4. The fallback emoji will show if the image fails to load

## Next Steps

1. Add your profile image to the `public/` folder
2. Name it `profile-image.jpg` (or update the src in the code)
3. Refresh your page to see the changes
4. Customize the alt text with your actual name and title
